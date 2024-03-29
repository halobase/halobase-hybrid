import { db } from '$lib/clients/db.js';
import { authenticate } from '$lib/server/auth.js';
import { get_file_id } from '$lib/server/get.js';


// Get a file of the authenticated user's.
export async function GET(event) {
  const { token } = await authenticate(event);
  if (!token) {
    return new Response(undefined, { status: 403 });
  }

  const file_id = get_file_id(event, token);

  /** @type {import('$lib/types').File[]} */
  const [file] = await db.select(file_id, token);

  return Response.json(file ?? {}, {
    status: file ? 200 : 404,
  });
}

// Update a file of the authenticated user's.
export async function PATCH(event) {
  const { token } = await authenticate(event);
  if (!token) {
    return new Response(undefined, { status: 403 });
  }

  const file_id = get_file_id(event, token);
  if (!file_id) {
    return new Response(undefined, { status: 404 });
  }
  const patch = await event.request.json();
  if ("name" in patch) {
    return Response.json(
      { detail: `Please invoke "/drives/{file}/move" to rename q file.` },
      { status: 400 }
    );
  }

  try {
    const [file] = await db.update(file_id, patch, token);
    return Response.json(file);
  } catch (e) {
    return Response.json(
      { detail: e },
      { status: 400 },
    );
  }
}

// Delete a file of the authenticated user's.
export async function DELETE(event) {
  const { token } = await authenticate(event);
  if (!token) {
    return new Response(undefined, { status: 403 });
  }

  const file_id = get_file_id(event, token);
  if (!file_id) {
    return new Response(undefined, { status: 404 });
  }
  try {
    const [file] = await db.delete(file_id, token);
    return Response.json(file);
  } catch (e) {
    return Response.json(
      { detail: e },
      { status: 400 },
    );
  }
}




