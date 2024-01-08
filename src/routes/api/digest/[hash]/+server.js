import { surreal } from '$lib/clients/surreal.js';
import { authenticate } from '$lib/server/auth.js';



export async function GET(event) {
  const { token } = await authenticate(event);
  if (!token) {
    return Response.json(
      { message: "Unauthorized" },
      { status: 401 },
    );
  }

  const hash = event.params.hash;
  /** @type {import('$lib/types').File[][]} */
  const [[file]] = await surreal.query(
    "select * from file where hash = $hash limit 1",
    { hash }
    // we don't use token here to bypass the RLS.
  );
  return new Response(undefined, {
    status: file ? 200 : 204
  });
}
