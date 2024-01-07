import { error } from '@sveltejs/kit';

export async function load(event) {
  const { drive, path } = event.params;
  const { drives } = await event.parent();


  /** @type {import("$lib/types").File[]} */
  const files = await event.fetch(
    path ? `/api/files/${drive}/${path}` : `/api/files/${drive}`,
  ).then(res => res.json());

  files.sort((a, b) => (new Date(b.created_at)).getTime()
    - (new Date(a.created_at)).getTime());
  return {
    drives,
    files,
    drive,
    path,
  };
}
