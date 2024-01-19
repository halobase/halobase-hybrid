import { deserialize_response } from '$lib/misc/encoding.js';
import { get } from '$lib/misc/form.js';
import { fail } from '@sveltejs/kit';

export const actions = {
  update: async function (event) {
    const form = await event.request.formData();
    const res = await event.fetch(`/api/ais/${event.params.ai}`, {
      method: "PATCH",
      body: JSON.stringify({
        icon: get(form, "icon"),
        name: get(form, "name"),
        system_prompt: get(form, "system_prompt"),
        temperature: +get(form, "temperature"),
        top_p: +get(form, "top_p"),
        tools: form.getAll("tools").map(v => v.toString()),
        files: form.getAll("files").map(v => v.toString()),
      }),
    });
    const [ai, error] = await deserialize_response(res);
    return error ? fail(res.status, error) : ai;
  }
};