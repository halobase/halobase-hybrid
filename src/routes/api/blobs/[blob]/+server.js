import { db } from '$lib/clients/db.js';
import { authenticate } from '$lib/server/auth.js';


export async function GET(event) {
  const { token } = await authenticate(event);
  if (!token) {
    return new Response(undefined, { status: 403 });
  }

  const [blob] = await db.select(event.params.blob);
  return Response.json(blob);
}
