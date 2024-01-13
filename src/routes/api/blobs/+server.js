import { db } from '$lib/clients/db.js';
import { authenticate } from '$lib/server/auth.js';


export async function POST(event) {
  const { token } = await authenticate(event);
  if (!token) {
    // 403 Forbidden
    return new Response(undefined, { status: 403 });
  }

  /** @type {import("$lib/types").Blob} */
  const init = await event.request.json();
  const { hash, hash_pre, size } = init;

  if ((!hash_pre && !hash) || !size) {
    // 400 Bad Request
    return new Response(undefined, { status: 400 });
  }

  const blob = await retrieve_blob(!hash, hash ? hash : hash_pre);
  if (blob) {
    // 409 Conflict
    return Response.json(blob, { status: 409 });
  }

  try {
    init.progress = 0;  // in case that it is set by the client.
    const [blob] = await db.create("blob", init);
    // 201 Created
    return Response.json(blob, { status: 201 });
  } catch (e) {
    // 500 Internal Server Error
    return Response.json(
      { detail: e },
      { status: 500 },
    );
  }
}

/**
 * See if the blob with the hash value exists.
 * @param {boolean} pre 
 * @param {string} [hash] 
 * @returns {Promise<import("$lib/types").Blob?>}
 */
async function retrieve_blob(pre, hash) {
  /** @type {import("$lib/types").Blob[][]} */
  const [[blob]] = await db.query(
    `select * from blob 
       where ${pre ? "hash_pre" : "hash"} = $hash 
         and progress = size`,
    { hash },
    // NOTE: we don't use a user's token here to bypass surrealdb's RLS.
  );
  
  return blob ?? null;
}
