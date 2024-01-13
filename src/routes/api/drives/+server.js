import { db } from '$lib/clients/db.js';
import { to_slug } from '$lib/misc/format.js';
import { authenticate } from '$lib/server/auth.js';

// List drives of the authenticated user's.
export async function GET(event) {
  const { token } = await authenticate(event);
  if (!token) {
    return new Response(undefined, { status: 403 });
  }
  /** @type {import('$lib/types').Drive[]} */
  const drives = await db.select("drive", token);
  return Response.json(drives);
}


// Create a drive for the authenticated user.
export async function POST(event) {
  const { token } = await authenticate(event);
  if (!token) {
    return new Response(undefined, { status: 403 });
  }

  /** @type {Partial<import('$lib/types').Drive>} */
  const init = await event.request.json();
  if (!init.name || !init.total) {
    return new Response(undefined, { status: 400 });
  }

  init.slug = to_slug(init.name);

  try {
    const [drive] = await db.create("drive", init, token);
    return Response.json(drive, { status: 201 });
  } catch (e) {
    return Response.json(
      { detail: e },
      { status: 400 })
  }
}
