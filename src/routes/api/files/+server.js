import { surreal } from '$lib/clients/surreal.js';
import { authenticate } from '$lib/server/auth.js';

// List files of the authenticated user's
export async function GET(event) {
  const { token } = await authenticate(event);
  if (!token) {
    return new Response(undefined, { status: 403 });
  }

  /** @type {import('$lib/types').File[]} */
  const files = await surreal.select("file", token);
  return Response.json(files);
}

export async function POST(event) {
  const { token } = await authenticate(event);
  if (!token) {
    return new Response(undefined, { status: 403 });
  }

  /** @type {import("$lib/types").File} */
  const init = await event.request.json();
  
}