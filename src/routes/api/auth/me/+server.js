import { surreal } from '$lib/clients/surreal.js';
import { authenticate } from '$lib/server/auth.js';

export async function GET(event) {
  const { token } = await authenticate(event.request, event.cookies);
  if (!token) {
    return Response.json(
      { message: "Unauthorized" },
      { status: 401 },
    );
  }
  /** @type {import("$lib/types").User[]} */
  const [user] = await surreal.select("user", token);
  return Response.json(user);
}