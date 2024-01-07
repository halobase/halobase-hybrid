import { surreal } from '$lib/clients/surreal.js';
import { to_slug } from '$lib/misc/format.js';
import { authenticate } from '$lib/server/auth.js';

export async function GET(event) {
  const { token } = await authenticate(event);
  if (!token) {
    return Response.json(
      { message: "Unauthorized" },
      { status: 401 },
    );
  }
  /** @type {import('$lib/types').Drive[]} */
  const drives = await surreal.select("drive", token);
  return Response.json(drives);
}

export async function POST(event) {
  const { token } = await authenticate(event);
  if (!token) {
    return Response.json(
      { message: "Unauthorized" },
      { status: 401 },
    );
  }
  /** @type {import('$lib/types').Drive}*/
  const init = await event.request.json();
  init.slug = to_slug(init.name);

  const [[id]] = await surreal.query(
    "select id from drive where slug = $slug",
    { slug: init.slug },
    token,
  );

  if (id) {
    return Response.json(
      { message: `Drive ${init.name} already exists.` },
      { status: 400 },
    );
  }

  /** @type {import('$lib/types').Drive[]} */
  const [drive] = await surreal.create("drive", init, token);
  return Response.json(drive);
}
