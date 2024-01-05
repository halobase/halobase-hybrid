import { surreal } from '$lib/clients/surreal.js';
import { authenticate } from '$lib/server/auth.js';

export async function GET(event) {
  const { token } = await authenticate(event.request, event.cookies);
  const keys = await surreal.select("key", token);
  return Response.json(keys);
}
