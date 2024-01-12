import { surreal } from '$lib/clients/surreal';
import { authenticate } from '$lib/server/auth';
import { get_drive_id } from './lib';


// Update a drive of the authenticated user's.
export async function PATCH(event) {
  const { token } = await authenticate(event);
  if (!token) {
    return new Response(undefined, { status: 403 });
  }

  const drive_id = await get_drive_id(event, token);
  if (!drive_id) {
    return new Response(undefined, { status: 404 });
  }

  const patch = await event.request.json();

  try {
    const [drive] = await surreal.update(drive_id, patch, token);
    return Response.json(drive);
  } catch (e) {
    return Response.json(
      { detail: e },
      { status: 400 },
    );
  }
}

// Delete a drive of the authenticated user's.
export async function DELETE(event) {
  const { token } = await authenticate(event);
  if (!token) {
    return new Response(undefined, { status: 403 });
  }

  const drive_id = await get_drive_id(event, token);
  if (!drive_id) {
    return new Response(undefined, { status: 404 });
  }
  try {
    const [drive] = await surreal.delete(drive_id, token);
    return Response.json(drive);
  } catch (e) {
    return Response.json(
      { detail: e },
      { status: 400 },
    );
  }
}

export async function GET(event) {
  const { token } = await authenticate(event);
  if (!token) {
    return new Response(undefined, { status: 403 });
  }

  const drive_id = await get_drive_id(event, token);
  if (!drive_id) {
    return new Response(undefined, { status: 404 });
  }

  const [[drive]] = await surreal.query(`
    select 
      *, 
      (select id, parent, name, mime_type, size 
       from file where drive = $drive_id) as files 
    from $drive_id;
  `,
    { drive_id },
    token,
  );
  return Response.json(drive);
}
