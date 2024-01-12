import { surreal } from '$lib/clients/surreal.js';
import { authenticate } from '$lib/server/auth.js';

export async function GET(event) {
  const { token } = await authenticate(event);
  if (!token) {
    return new Response(undefined, { status: 403 });
  }

  const by = event.url.searchParams.get("by") || "id";
  if (by === "hash") {
    const { slice: hash } = event.params;
    const [[slice]] = await surreal.query(
      "select * from slice where hash = $hash",
      { hash },
      // NOTE: we need no token here to bypass the surreal RLS.
    );
    return Response.json(slice);
  }

  // we do it by `id` by default.
  const { slice: slice_id } = event.params;
  const [slice] = await surreal.select(slice_id);
  return Response.json(slice);
}
