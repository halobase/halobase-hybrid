import { db } from '$lib/clients/db.js';
import { authenticate } from '$lib/server/auth.js';

export async function GET(event) {
  const { token } = await authenticate(event);
  if (!token) {
    return Response.json(
      { message: "Unauthorized" },
      { status: 401 },
    );
  }
  /** @type {import("$lib/types").User[]} */
  const [user] = await db.select("user", token);
  return Response.json(user);
}