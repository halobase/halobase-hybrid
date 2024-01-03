import { surreal } from '$lib/clients/surreal.js';

export async function GET(event) {
  const path = event.params.path;
  const auth = event.cookies.get("hb-auth");
  if (!auth) {
    return Response.json(
      { message: "Unauthorized" },
      { status: 401 },
    );
  }
  const [files] = await surreal.query(
    "select * from file where path = $path",
    { path },
    auth,
  );
  return Response.json(files);
}

export async function POST(event) {
  const path = event.params.path;
  const auth = event.cookies.get("hb-auth");
  if (!auth) {
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
    auth,
  );
  if (ids.length > 0) {
    return Response.json(
      { message: `${path}/${name} already exists` },
      { status: 400 },
    );
  }

  try {
    const [file] = await surreal.create("file", { ...data, path }, auth);
    return Response.json(file);
  } catch (e) {
    return Response.json(
      { message: (e instanceof Error) ? e.message : e },
      { status: 400 },
    );
  }
}
