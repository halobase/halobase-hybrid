import { PutObjectCommand, S3_BUCKET, s3 } from "$lib/clients/s3";
import { surreal } from '$lib/clients/surreal.js';
import { authenticate } from '$lib/server/auth.js';
import posixpath from "path/posix";

export async function GET(event) {
  const { token } = await authenticate(event);
  if (!token) {
    return Response.json(
      { message: "Unauthorized" },
      { status: 401 },
    );
  }
  const { drive, path } = event.params;
  const [files] = await surreal.query(`
    select * from file
      where drive = $drive 
        and path = $path
    `,
    { drive, path },
    token,
  );
  return Response.json(files);
}

export async function POST(event) {
  const { token } = await authenticate(event);
  if (!token) {
    return Response.json(
      { message: "Unauthorized" },
      { status: 401 },
    );
  }

  // 1) check if the file to be created exists.
  // 2) see if we have to upload a file if given it to s3.
  // 3) save the file.

  const { drive, path } = event.params;

  /** @type {(form: FormData, key: string) => string} */
  const get = (form, key) => {
    return form.get(key)?.toString() || "";
  }

  const form = await event.request.formData();
  const name = get(form, "name");
  const init = {
    drive,
    path,
    name,
    size: +get(form, "size"),
    mime_type: get(form, "mime_type"),
    public: !!get(form, "public"),
    hash: get(form, "hash"),
  }

  /** @type {string[][]} */
  const [[id]] = await surreal.query(`
    select value id from file 
      where drive = $drive 
        and path = $path 
        and name = $name
    `,
    { drive, path, name },
    token,
  );
  if (id) {
    return Response.json(
      { message: `${path} already exists` },
      { status: 400 },
    );
  }

  const file = form.get("file");
  if (file && file instanceof File) {
    try {
      await upload(init.hash, file);
      // TODO: should we save the etag returned by s3?
    } catch (e) {
      return Response.json(
        { message: (e instanceof Error) ? e.message : e },
        { status: 400 },
      );
    }
  }

  try {
    const [file] = await surreal.create("file", init, token);
    return Response.json(file);
  } catch (e) {
    return Response.json(
      { message: (e instanceof Error) ? e.message : e },
      { status: 400 },
    );
  }
}

/**
 * 
 * @param {string} key 
 * @param {File} file 
 */
async function upload(key, file) {
  return await s3.send(new PutObjectCommand({
    Bucket: S3_BUCKET,
    Key: key,
    Body: Buffer.from(await file.arrayBuffer()),
    ContentType: file.type,
    ContentLength: file.size,
  }));
}

export async function DELETE(event) {
  const { token } = await authenticate(event);
  if (!token) {
    return Response.json(
      { message: "Unauthorized" },
      { status: 401 },
    );
  }

  /** @type {{name: string}} */
  const { name } = await event.request.json();
  const { drive, path } = event.params;

  try {
    /** @type {import("$lib/types").File[][]} */
    const [files] = await surreal.query(`
      delete file 
        where drive = $drive 
          and (
            (path = $path and name = $name) 
            or string::startsWith(
              path,
              if $path then string::join("/", $path, $name) else $name end
            )
          )
    `,
      { drive, path, name },
      token,
    );
    return new Response();
  } catch (e) {
    return Response.json(
      { message: (e instanceof Error) ? e.message : e },
      { status: 400 },
    );
  }
}

export async function PATCH(event) {
  const { token } = await authenticate(event);
  if (!token) {
    return Response.json(
      { message: "Unauthorized" },
      { status: 401 },
    );
  }

  const id = event.url.searchParams.get("id") || "";
  if (id) {
    try {
      const patch = await event.request.json();
      const [file] = await surreal.update(id, patch, token);
      return Response.json(file);
    } catch (e) {
      return Response.json(
        { message: (e instanceof Error) ? e.message : e },
        { status: 400 },
      );
    }
  }

  // TODO: fix code below

  /**
   * @type {{
   *   from: string,
   *   to: string,
   * }}
   */
  const { from, to } = await event.request.json();
  const { drive, path } = event.params;

  await surreal.query(`
    begin transaction
      update file set name = $to
        where drive = $drive
          and path = $from;
      update file set path = string::replace(path, $from, $to) 
        where drive = $drive 
          and string::startsWith(path, $from);
    commit transaction
    `,
    { drive, path, from, to, },
    token,
  );

  return new Response();
}
