import { deserialize_response } from '$lib/misc/encoding.js';
import { get } from '$lib/misc/form.js';
import { fail } from '@sveltejs/kit';

export const actions = {
  create: async function (event) {
    const form = await event.request.formData();
    const res = await event.fetch("/api/ais", {
      method: "POST",
      body: JSON.stringify({
        name: get(form, "name"),
        icon: get(form, "icon"),
        system_prompt: get(form, "system_prompt"),
      }),
    });
    const [ai, error] = await deserialize_response(res);
    return error ? fail(res.status, error) : ai;
  },
};
