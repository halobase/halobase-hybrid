import { error } from '@sveltejs/kit';

export async function load(event) {
  const { chats } = await event.parent();
  /** @type {import('$lib/types').Chat=} */
  const chat = chats.find(v => v.id === event.params.chat);
  if (!chat) {
    throw error(404);
  }
  return {
    chat,
  };
}