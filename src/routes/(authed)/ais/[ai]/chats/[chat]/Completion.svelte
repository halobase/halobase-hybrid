<script>
  import { createEventDispatcher, onMount, onDestroy } from "svelte";
  import { fetchEventSource } from "@microsoft/fetch-event-source";
  import { error } from "@sveltejs/kit";
  /** @type {import("$lib/types").AI} */
  export let ai;
  /** @type {import('$lib/types').Chat} */
  export let chat;
  /** @type {Pick<import("$lib/types").Message, "role" | "content">[]} */
  export let msgs;

  const dispatch = createEventDispatcher();

  /** @type {AbortController} */
  let ctrl;
  let completion = "";

  async function __fetch() {
    ctrl = new AbortController();

    const init = {
      stream: true,
      messages: msgs,
    };

    await fetchEventSource(`/api/ais/${ai.id}/chats/${chat.id}/run`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(init),
      signal: ctrl.signal,
      async onopen(res) {
        if (!res.ok) {
          // @ts-ignore
          throw error(res.status);
        }
        completion = "";
      },
      onerror(err) {
        throw err;
      },
      onmessage(event) {
        const delta = JSON.parse(event.data);
        completion += delta.content;
      },
      onclose() {
        console.log("[assistant]", completion);
        dispatch("close", { role: "assistant", content: completion });
      },
    });
  }

  function __abort() {
    if (ctrl) ctrl.abort();
  }

  onMount(async function () {
    await __fetch();
  });

  onDestroy(function () {
    if (ctrl) ctrl.abort();
  });
</script>

<a class="text-3xl" href="/ais/{ai.slug}/settings">
  {ai.icon}
</a>
<div class="bubble bubble-l bubble-info mt-1">
  {completion}
</div>
