import { surreal } from '$lib/clients/surreal.js';
import { get } from '$lib/misc/form.js';
import { authenticate } from '$lib/server/auth.js';
import { get_drive_id } from '../lib.js';

// List files from a drive of the authenticated user's.
export async function GET(event) {
  const { token } = await authenticate(event);
  if (!token) {
    return new Response(undefined, { status: 403 });
  }

  const drive_id = await get_drive_id(event, token);
  if (!drive_id) {
    return new Response(undefined, { status: 404 });
  }

  const query = event.url.searchParams;
  const parent = get(query, "parent");

  const sql = `
    select * from file 
      where drive = $drive_id
        and parent = $parent
      fetch blob
  `;

  const [files] = await surreal.query(sql, { drive_id, parent }, token);
  return Response.json(files);
}


// Create a file to a drive of the authenticated user's.
export async function POST(event) {
  const { token } = await authenticate(event);
  if (!token) {
    return new Response(undefined, { status: 403 });
  }

  // we have to turn the path variable into a drive id if it is a slug.
  const drive_id = await get_drive_id(event, token);
  if (!drive_id) {
    return new Response(undefined, { status: 404 });
  }

  /** @type {Partial<import('$lib/types').File>} */
  const init = await event.request.json();
  // make sure the correct drive id is set.
  init.drive = drive_id;

  // either a file os a folder needs both a parent and a name.
  if (!init.parent || !init.name) {
    return new Response(undefined, { status: 400 });
  }

  // let's first see if the file or folder to be created already exists.
  const [[file_id]] = await surreal.query(
    "select value id from file where drive = $drive_id and parent = $parent and name = $name",
    { parent: init.parent, name: init.name, drive: drive_id },
    token,
  );
  if (file_id) {
    // oops.  we don't and will not provide something like auto-rename.
    return new Response(undefined, { status: 409 });
  }

  // fine, then see if it is a folder to be created.
  if (!init.mime_type) {
    const [file] = await surreal.create("file", init, token);
    return Response.json(file, { status: 201 });
  }

  // alright, it is an actual file then, but let's first check out if 
  // necessary parameters for a file are provided.
  if (
    !init.hash ||
    !init.blob ||
    !init.mime_type ||
    typeof init.blob !== "string"
  ) {
    // too bad :(
    return new Response(undefined, { status: 400 });
  }

  // remember that accordding to the design of the instant upload, a file 
  // is just a reference to one single existing blob that maintains all 
  // slices of the actual file content.
  /** @type {import("$lib/types").Blob[]} */
  const [blob] = await surreal.select(init.blob);
  if (
    !blob ||
    (blob.hash && (blob.hash !== init.hash)) ||
    (blob.size && (blob.size !== init.size))
  ) {
    // looks like the client failed to know the correct blob to refer to.
    return new Response(undefined, { status: 404 });
  }

  // okay we are good to go.
  try {
    /** @type {import("$lib/types").File[]} */
    const [file] = await surreal.create("file", init, token);
    // well done bro.
    return Response.json(file, { status: 201 });
  } catch (e) {
    return Response.json(
      { detail: e },
      { status: 400 }  // my server never fails, it's all the client :)
    );
  }
}
