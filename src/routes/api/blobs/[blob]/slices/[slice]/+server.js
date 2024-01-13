import { db } from '$lib/clients/db.js';
import { authenticate } from '$lib/server/auth.js';

export async function GET(event) {
  const { token } = await authenticate(event);
  if (!token) {
    return new Response(undefined, { status: 403 });
  }

  const by = event.url.searchParams.get("by") || "id";
  if (by === "hash") {
    const { slice: hash } = event.params;
    const [[slice]] = await db.query(
      "select * from slice where hash = $hash",
      { hash },
      // NOTE: we need no token here to bypass the surreal RLS.
    );
    return Response.json(slice);
  }

  // we do it by `id` by default.
  const { slice: slice_id } = event.params;
  const [slice] = await db.select(slice_id);
  return Response.json(slice);
}
