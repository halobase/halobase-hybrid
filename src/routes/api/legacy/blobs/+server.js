import { surreal } from '$lib/clients/surreal.js';
import { authenticate } from '$lib/server/auth.js';

export async function POST(event) {
  const { token } = await authenticate(event);
  if (!token) {
    return new Response(undefined, { status: 403 });
  }

  /** @type {Partial<import("$lib/types").Blob>} */
  const init = await event.request.json();

  if (!init.hash || !init.size) {
    return new Response(undefined, { status: 400 });
  }

  const [[blob]] = await surreal.query(
    `select * from blob where hash = $hash and progress = size`,
    { hash: init.hash },
  );
  if (blob) {
    return Response.json(blob, { status: 409 });
  }

  try {
    const [blob] = await surreal.create("blob", init);
    return Response.json(blob, { status: 201 });
  } catch (e) {
    return Response.json(
      { detail: e },
      { status: 500 },
    );
  }
}