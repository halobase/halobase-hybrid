export async function load(event) {
  /** @type {import("$lib/types").Chat[]} */
  const chats = await event.fetch(`/api/ai/${event.params.ai}/chats`).then(res => res.json());
  return {
    chats,
  }
}