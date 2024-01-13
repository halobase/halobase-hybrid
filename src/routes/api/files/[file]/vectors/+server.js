import { db } from '$lib/clients/db.js';
import { authenticate } from '$lib/server/auth.js';
import { get_file_id } from '../../../lib.js';

export async function POST(event) {
  const { token } = await authenticate(event);
  if (!token) {
    return new Response(undefined, { status: 403 });
  }

  const file_id = get_file_id(event, token);
  if (!file_id) {
    return new Response(undefined, { status: 404 });
  }

  /** 
   * @type {Partial<
   *   import("$lib/types").Task<
   *     Pick<import("$lib/types").File, "id">,
   *     import("$lib/types").Doc[]
   *   >
   * >}
   */
  const init = {
    name: "File Embedding",
    command: "embedding",
    input: { 
      id: file_id,
    },
  };

  try {
    const [task] = await db.create("task", init, token);
    return Response.json(task, { status: 202 });
  } catch (e) {
    console.error(e);
    return Response.json(
      { detail: e },
      { status: 500 },
    );
  }
}
