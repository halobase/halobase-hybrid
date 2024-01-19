import { db } from '$lib/clients/db.js';
import { to_slug } from '$lib/misc/format.js';
import { authenticate } from '$lib/server/auth.js';

export async function GET(event) {
  const { token } = await authenticate(event);
  if (!token) {
    return new Response(undefined, { status: 403 });
  }

  const ais = await db.select("ai", token);
  return Response.json(ais);
}


export async function POST(event) {
  const { token } = await authenticate(event);
  if (!token) {
    return new Response(undefined, { status: 403 });
  }

  /** @type {Partial<import("$lib/types").AI>} */
  const init = await event.request.json();
  if (!init.name) {
    return new Response(undefined, { status: 400 });
  }

  init.slug = to_slug(init.name);

  try {
    const [ai] = await db.create("ai", init, token);
    return Response.json(ai, { status: 201 });
  } catch (detail) {
    return Response.json(
      { detail, },
      { status: 500 },
    );
  }
}
