import { PutObjectCommand, S3_BUCKET, s3 } from '$lib/clients/s3.js';
import { db } from '$lib/clients/db.js';
import { to_hex } from '$lib/misc/encoding.js';
import { get } from '$lib/misc/form.js';
import { authenticate } from '$lib/server/auth.js';


/**
 * @typedef {{
 *   upload_id: string,
 *   key: string,
 *   offset: number,
 *   size: number,
 *   index: number,   
 * }} Claims
 */

export async function POST(event) {
  const { token } = await authenticate(event);
  if (!token) {
    return new Response(undefined, { status: 403 });
  }

  const query = event.url.searchParams;
  const header = event.request.headers;
  const index = query.get("index");
  const offset = query.get("offset");
  const hash_blob = query.get("hash_blob");
  const content_length = +get(header, "Content-Length");

  if (!index || !offset || !hash_blob) {
    return new Response(undefined, { status: 400 });
  }

  /** @type {import("$lib/types").Blob[]} */
  const [blob] = await db.select(event.params.blob);
  if (!blob) {
    return new Response(undefined, { status: 404 });
  }


  const buffer = await (await event.request.blob()).arrayBuffer() // NodeJS sucks!
  if (!buffer) {
    return new Response(undefined, { status: 400 });
  }

  const hash_name = "sha-1";
  const hash = to_hex(await crypto.subtle.digest(hash_name, buffer));

  // see if the slice to the blob already exists.
  const [[slice_id]] = await db.query(
    `select id from slice where hash = $hash and blob = $blob`,
    { hash: hash_blob, blob: blob.id },
    token,
  );
  if (slice_id) {
    return new Response(undefined, { status: 409 });
  }

  try {
    await s3.send(new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: `${blob.id}/${index}`,
      Body: Buffer.from(buffer),
      ContentLength: content_length,
    }));
  } catch (e) {
    console.error(e);
    return new Response(undefined, { status: 503 });
  }

  /** @type {Partial<import("$lib/types").Slice>} */
  const init = {
    blob: blob.id,
    size: buffer.byteLength,
    offset: +offset,
    hash: hash_blob,
    hash_name,
  };

  try {
    const [slice] = await db.query(`
      begin;
        let $slice = create only slice content $init;
        update $slice.blob set hash = $hash_blob;
        return $slice;
      commit;
      `,
      { init, hash_blob },
      token
    );
    return Response.json(slice, { status: 201 });
  } catch (e) {
    console.error(e);
    return new Response(undefined, { status: 400 });
  }
}

export async function GET(event) {
  const { token } = await authenticate(event);
  if (!token) {
    return new Response(undefined, { status: 403 });
  }

  /** @type {import("$lib/types").Slice[]} */
  const [slices] = await db.query(
    `select * from slice where id in $blob.slices`,
    { blob: event.params.blob }
  );
  return Response.json(slices);
}
