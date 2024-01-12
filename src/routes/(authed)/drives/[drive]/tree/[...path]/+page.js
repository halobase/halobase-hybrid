import { walk } from '$lib/misc/algorithm.js';

export async function load(event) {
  const { path } = event.params;
  const { drives, drive, tree } = await event.parent();

  const crumbs = path ? path.split("/") : [];

  if (tree) {
    const node = walk(tree, (file, depth) => {
      return depth < crumbs.length && file.name === crumbs[depth];
    });

    if (node) {
      /** @type {import("$lib/types").File[]} */
      const files = await event.fetch(
        `/api/drives/${drive.id}/files?parent=${node?.key.id}`
      ).then(res => res.json());

      return {
        path,
        drives,
        drive,
        files,
        node,
        crumbs,
      };
    }
  }

  return {
    path,
    drives,
    drive,
    crumbs,
  };
}


