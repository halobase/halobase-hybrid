import { db } from '$lib/clients/db.js';
import { authenticate } from '$lib/server/auth.js';
import { get_ai_id } from '../../lib.js';

export async function GET(event) {
  const { token } = await authenticate(event);
  if (!token) {
    return new Response(undefined, { status: 403 });
  }

  const ai_id = await get_ai_id(event, token);
  if (!ai_id) {
    return new Response(undefined, { status: 404 });
  }
  const [ai] = await db.select(ai_id, token);
  return Response.json(ai);
}
