import { surreal } from '$lib/clients/surreal.js';
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
    const [blob] = await surreal.create("blob", init);
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
  const [[blob]] = await surreal.query(
    `select * from blob 
       where ${pre ? "hash_pre" : "hash"} = $hash 
         and progress = size`,
    { hash },
    // NOTE: we don't use a user's token here to bypass surrealdb's RLS.
  );
  
  return blob ?? null;
}


// /**
//  * @param {import('./$types').RequestEvent} event 
//  * @param {Pick<import("$lib/types").Blob, "size">} init
//  * @returns {Promise<{
//  *   upload: import("$lib/types").Upload,
//  *   slices: Pick<import("$lib/types").Slice, "offset" | "url" | "size">[]
//  * }>} 
//  */
// async function apply_for_upload_urls(event, init) {
//   // TODO: fetch upload URLs from service registry, for 
//   //       now we just receive all slices by ourselves.
//   const origin = event.request.headers.get("Origin") || "";
//   // TODO: we should salt it for collision attacks.
//   const upload_id = crypto.randomUUID();

//   const slicing_size = slicing(init.size);
//   const n_slices = Math.ceil(init.size / slicing_size);

//   const slices = await Promise.all(Array.apply(null, new Array(n_slices)).map(async (_, index) => {
//     const offset = index * slicing_size;
//     const size = Math.min(slicing_size, init.size - offset);
//     const key = crypto.randomUUID();  // used as s3 object key
//     const claims = { upload_id, offset, size, index, key };
//     const token = jsonwebtoken.sign(claims, await fetch_private_secret());
//     const url = `${origin}/api/blob/upload?token=${token}`;
//     return { offset, size, url };
//   }));

//   return {
//     slices,
//     upload: {
//       id: upload_id,
//       state: "pending"
//     },
//   };
// }

// /** 
//  * @param {number} x 
//  * @param {number} [x_min]
//  * @param {number} [x_max]
//  * @param {number} [y_min]
//  * @param {number} [y_max]   
//  */
// function slicing(x, x_min, x_max, y_min, y_max) {
//   x_min = x_min || 256 * KiB;
//   x_max = x_max || 1 * GiB;
//   y_min = y_min || 256 * KiB;
//   y_max = y_max || 5 * MiB;

//   if (x < x_min) return y_min;
//   if (x > x_max) return y_max;

//   const k = (y_max - y_min) / (x_max - x_min);
//   const r = Math.floor(k * (x - x_max) + y_max);
//   return (r + y_min - 1) & (~(y_min - 1));  // align bytes to y_min
// }
