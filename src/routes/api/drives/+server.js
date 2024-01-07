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
  /** @type {Partial<import('$lib/types').Drive>}*/
  const init = await event.request.json();

  const [[id]] = await surreal.query(
    "select id from drive where name = $name",
    { name: init.name },
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
