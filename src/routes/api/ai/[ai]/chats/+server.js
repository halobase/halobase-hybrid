import { db } from '$lib/clients/db.js';
import { authenticate } from '$lib/server/auth.js';
import { get_ai_id } from '../../../lib.js';

export async function POST(event) {
  const { token } = await authenticate(event);
  if (!token) {
    return new Response(undefined, { status: 403 });
  }

  const ai = await get_ai_id(event, token);
  if (!ai) {
    return new Response(undefined, { status: 404 });
  }

  try {
    const [chat] = await db.create("chat", { ai }, token);
    return Response.json(chat, { status: 201 });
  } catch (detail) {
    return Response.json(
      { detail, },
      { status: 500 },
    );
  }
}

export async function GET(event) {
  const { token } = await authenticate(event);
  if (!token) {
    return new Response(undefined, { status: 403 });
  }

  const ai = await get_ai_id(event, token);
  if (!ai) {
    return new Response(undefined, { status: 404 });
  }

  const [chats] = await db.query(
    `select * from chat where ai = $ai`,
    { ai },
    token,
  );
  return Response.json(chats);
}