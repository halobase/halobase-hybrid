import { PutObjectCommand, S3_BUCKET, s3 } from '$lib/clients/s3.js';
import { db } from '$lib/clients/db.js';
import { get } from '$lib/misc/form.js';
import { authenticate } from '$lib/server/auth.js';

export async function POST(event) {
  const { token } = await authenticate(event);
  if (!token) {
    return new Response(undefined, { status: 403 });
  }

  const form = await event.request.formData();
  const name = get(form, "name");
  const parent = get(form, "parent");
  const blob = get(form, "blob");
  const hash = get(form, "hash");
  const mime_type = get(form, "mime_type");
  const size = +get(form, "size");
  const __public = !!get(form, "public");

  const drive = await get_drive_id(get(form, "drive"), token);

  if (!name || !parent || !drive) {
    return Response.json(
      { message: "Bad parameters" },
      { status: 400 },
    );
  }

  const [[file_id]] = await db.query(
    "select value id from file where drive = $drive and parent = $parent and name = $name",
    { parent, name, drive },
    token,
  );
  if (file_id) {
    return Response.json(
      { message: `${name} already exists.` },
      { status: 409 });
  }

  const file = form.get("file");
  if (file) {
    if (typeof file === "string" || !blob) {
      return Response.json(
        { message: "Bad file" },
        { status: 400 },
      );
    }
    try {
      await s3.send(new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: `${blob}/0`,
        Body: Buffer.from(await file.arrayBuffer()),
        ContentLength: file.size,
        ContentType: file.type,
      }));
    } catch (e) {
      console.error(e);
      return Response.json(
        { detail: e },
        { status: 500 },
      );
    }
    const slice = {
      blob,
      hash,
      hash_name: "sha-1",
      size: file.size,
      offset: 0,
    };
    try {
      await db.create("slice", slice, token);
    } catch (e) {
      console.error(e);
      return Response.json(
        { detail: e },
        { status: 500 },
      );
    }
  }

  /** @type {Partial<import("$lib/types").File>} */
  const init = {
    drive,
    name,
    parent,
    size,
    mime_type,
  };

  if (mime_type) {
    init.blob = blob;
    init.public = __public;
  }

  try {
    const [file] = await db.create("file", init, token);
    return Response.json(file, { status: 201 });
  } catch (e) {
    console.error(e);
    return Response.json(
      { detail: e },
      { status: 500 },
    );
  }
}

/**
 * @param {string} drive
 * @param {string} token
 * @returns {Promise<string?>} 
 */
async function get_drive_id(drive, token) {
  if (drive.startsWith("drive:")) {
    return drive;
  }
  const [[id]] = await db.query(
    "select value id from drive where slug = $slug",
    { slug: drive },
    token,
  );
  return id;
}