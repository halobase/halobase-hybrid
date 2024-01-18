import { db } from '$lib/clients/db.js';
import { authenticate } from '$lib/server/auth.js';

export async function GET(event) {
  const { token } = await authenticate(event);
  if (!token) {
    return new Response(undefined, { status: 403 });
  }
  /** @type {import("$lib/types").Function[]} */
  const fns = await db.select("fn");
  return Response.json(fns);
}
