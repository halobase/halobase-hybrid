export async function load(event) {
  const { ai: slug } = event.params;
  /** @type {import("$lib/types").AI} */
  const ai = await event.fetch(`/api/ai/${slug}`).then(res => res.json());
  /** @type {import("$lib/types").Chat[]} */
  const chats = await event.fetch(`/api/ai/${slug}/chats`).then(res => res.json());
  return {
    ai,
    chats,
  }
}