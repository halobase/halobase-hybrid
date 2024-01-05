export async function load(event) {
  const path = event.params.path;

  /** @type {import("$lib/types").File[]} */
  const files = await event.fetch(
    path ? `/api/files/${path}` : "/api/files",
  ).then(res => res.json());

  files.sort((a, b) => (new Date(b.created_at)).getTime()
    - (new Date(a.created_at)).getTime());
  return { files, path };
}
