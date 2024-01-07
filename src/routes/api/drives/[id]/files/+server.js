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

  const { id } = event.params;
  
  const [files] = await surreal.query(`
    select mime_type,size from file where drive = (
      select value slug from $id
    )[0]
  `,
    { id },
    token,
  );
  return Response.json(files);
}