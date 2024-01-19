import { db } from '$lib/clients/db.js';
import { to_slug } from '$lib/misc/format.js';
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


export async function PATCH(event) {
  const { token } = await authenticate(event);
  if (!token) {
    return new Response(undefined, { status: 403 });
  }

  const ai_id = await get_ai_id(event, token);
  if (!ai_id) {
    return new Response(undefined, { status: 404 });
  }

  /** @type {Partial<import("$lib/types").AI>} */
  const patch = await event.request.json();
  if (!patch.name) {
    // TODO: we may also validate other fields in patch.
    return new Response(undefined, { status: 400 });
  }
  patch.slug = to_slug(patch.name);
  
  try {
    const [ai] = await db.update(ai_id, patch, token);
    return Response.json(ai);
  } catch (e) {
    return Response.json(
      { detail: e },
      { status: 500 }
    );
  }
}

