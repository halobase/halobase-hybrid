import { deserialize_response } from '$lib/misc/encoding.js';
import { get } from '$lib/misc/form.js';
import { fail } from '@sveltejs/kit';

export const actions = {
  create: async function (event) {
    const form = await event.request.formData();

    // y = 50MiB * 10^x
    const total = 50 * 1024 * 1024 * Math.pow(10, +get(form, "total"));

    /** @type {Partial<import('$lib/types').Drive>} */
    const init = {
      name: get(form, "name"),
      total,
      readonly: !!get(form, "readonly"),
      default: !!get(form, "default"),
    };

    const res = await event.fetch("/api/drives", {
      method: "POST",
      body: JSON.stringify(init),
    });

    const [drive, error] = await deserialize_response(res);
    if (error) {
      return fail(res.status, error);
    }
    return drive;
  },
};