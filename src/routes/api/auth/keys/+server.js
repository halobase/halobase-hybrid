import { db } from '$lib/clients/db.js';
import { authenticate } from '$lib/server/auth.js';

export async function GET(event) {
  const { token } = await authenticate(event);
  const keys = await db.select("key", token);
  return Response.json(keys);
}
