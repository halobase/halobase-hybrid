import { redirect } from '@sveltejs/kit';

export async function load(event) {
  const { ai, chats } = await event.parent();
  
  if (chats.length > 0) {
    const location = `/ais/${ai.slug}/chats/${chats[0].id}`;
    throw redirect(303, location);  // 303  See Other
  }
}
