import { surreal } from '$lib/clients/surreal.js';

export async function GET(event) {
  const auth = event.cookies.get("hb-auth");
  const keys = await surreal.select("key", auth);
  return Response.json(keys);
}
