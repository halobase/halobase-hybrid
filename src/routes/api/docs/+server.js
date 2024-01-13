import { authenticate } from '$lib/server/auth.js';

export async function POST(event) {
  const { token } = await authenticate(event);
  if (!token) {
    return new Response(undefined, { status: 403 });
  }

  
}