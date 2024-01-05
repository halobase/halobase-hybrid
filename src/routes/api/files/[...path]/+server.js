import { surreal } from '$lib/clients/surreal.js';
import { authenticate } from '$lib/server/auth.js';

export async function GET(event) {
  const path = event.params.path;
  const token = await authenticate(event.request, event.cookies);
  if (!token) {
    return Response.json(
      { message: "Unauthorized" },
      { status: 401 },
    );
  }
  const [files] = await surreal.query(
    "select * from file where path = $path",
    { path },
    token,
  );
  return Response.json(files);
}

export async function POST(event) {
  const path = event.params.path;
  const token = await authenticate(event.request, event.cookies);
  if (!token) {
    return Response.json(
      { message: "Unauthorized" },
      { status: 401 },
    );
  }

  const data = await event.request.json();
  const name = data.name;
  const [ids] = await surreal.query(
    "select id from file where path = $path and name = $name",
    { path, name },
    token,
  );
  if (ids.length > 0) {
    return Response.json(
      { message: `${path}/${name} already exists` },
      { status: 400 },
    );
  }

  try {
    const [file] = await surreal.create("file", { ...data, path }, token);
    return Response.json(file);
  } catch (e) {
    return Response.json(
      { message: (e instanceof Error) ? e.message : e },
      { status: 400 },
    );
  }
}

export async function DELETE(event) {
  const id = event.params.path;
  const token = await authenticate(event.request, event.cookies);
  if (!token) {
    return Response.json(
      { message: "Unauthorized" },
      { status: 401 },
    );
  }
  try {
    const [file] = await surreal.delete(id, token);
    return Response.json(file);
  } catch (e) {
    return Response.json(
      { message: (e instanceof Error) ? e.message : e },
      { status: 400 },
    );
  }
}

export async function PATCH(event) {
  const id = event.params.path;
  const token = await authenticate(event.request, event.cookies);
  if (!token) {
    return Response.json(
      { message: "Unauthorized" },
      { status: 401 },
    );
  }
  const data = await event.request.json();
  try {
    const [file] = await surreal.update(id, data, token);
    return Response.json(file);
  } catch (e) {
    return Response.json(
      { message: (e instanceof Error) ? e.message : e },
      { status: 400 },
    );
  }
}
