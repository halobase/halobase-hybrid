import { ai as __ai } from "$lib/clients/ai.js";
import { db } from '$lib/clients/db.js';
import { authenticate } from '$lib/server/auth.js';
import { get_ai_id, get_chat_id } from '$lib/server/get.js';
import { Stream } from "openai/streaming.mjs";


export async function POST(event) {
  const { token } = await authenticate(event);
  if (!token) {
    return new Response(undefined, { status: 403 });
  }

  const ai_id = await get_ai_id(event, token);
  const chat_id = await get_chat_id(event, token);
  if (!ai_id || !chat_id) {
    return new Response(undefined, { status: 404 });
  }

  /** @type {import("$lib/types").AI[]} */
  const [ai] = await db.select(ai_id, token);

  /** @type {import("$lib/types").Function[][]} */
  const [fns] = await db.query(
    `select name, description, parameters from fn where id in $fn_ids`,
    { fn_ids: ai.tools },
    token,
  );

  /** @type {import("$lib/types").ChatRequest} */
  const init = await event.request.json();

  const stream = new ReadableStream({
    async start(ctrl) {
      await run(event, ctrl, init, ai, fns);
      ctrl.close();
    },
    cancel(reason) {
      console.log(reason);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
    }
  });
}

/**
 * @param {import("./$types.js").RequestEvent} event 
 * @param {ReadableStreamDefaultController<string>} ctrl 
 * @param {import("$lib/types").ChatRequest} init 
 * @param {import("$lib/types").AI} ai 
 * @param {import("$lib/types").Function[]} fns 
 */
async function run(event, ctrl, init, ai, fns) {
  /** @type {import("openai/resources/index.mjs").ChatCompletionTool[]} */
  const tools = fns.map(v => ({ type: "function", function: v }));
  const messages = init.messages.map(m => ({
    ...m,
    content: typeof m.content === "string" ? m.content : m.content?.reduce((a, v) => (
      a + " " + (v.type === "text" ? v.text : v.image_url.url)
    ), "") ?? ""
  }));

  const res = await __ai.chat.completions.create({
    model: ai.model,
    messages: messages,
    tools: tools,
    tool_choice: "auto"
  });

  console.log(res);

  const res_message = res.choices[0].message;
  const tool_calls = res_message.tool_calls;

  if (!tool_calls) {
    ctrl.enqueue(`data: ${JSON.stringify(res_message)}\r\n\r\n`);
    return;
  }

  messages.push(res_message);

  // ctrl.enqueue(`data: ${JSON.stringify(res_message)}\r\n\r\n`);

  for (const tool_call of tool_calls) {
    const fn_name = tool_call.function.name;
    const fn_args = tool_call.function.arguments;

    const fn_res = await event.fetch(`/api/fns/${fn_name}/call`, {
      method: "POST",
      body: fn_args
    }).then(res => res.text());

    messages.push({
      tool_call_id: tool_call.id,
      role: "tool",
      // @ts-ignore
      name: fn_name,
      content: fn_res,
    });
  }
  const res_2 = await __ai.chat.completions.create({
    model: ai.model,
    messages: messages,
    stream: init.stream,
  });

  if (res_2 instanceof Stream) {
    for await (const chunk of res_2) {
      const choice = chunk.choices[0];
      if (choice.finish_reason === "stop") {
        // TODO: stats
        return;
      }
      ctrl.enqueue(`data: ${JSON.stringify(choice.delta)}\r\n\r\n`);
    }
  } else {
    ctrl.enqueue(`data: ${JSON.stringify(res_2.choices[0].message)}\r\n\r\n`);
  }
}

