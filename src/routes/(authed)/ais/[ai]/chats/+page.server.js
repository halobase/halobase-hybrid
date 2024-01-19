import { deserialize_response } from '$lib/misc/encoding.js';
import { fail } from '@sveltejs/kit';

export const actions = {
  create: async function (event) {
    const { ai } = event.params;
    const res = await event.fetch(`/api/ais/${ai}/chats`, {
      method: "POST",
    });
    const [chat, error] = await deserialize_response(res);
    return error ? fail(res.status, error) : chat;
  },
};