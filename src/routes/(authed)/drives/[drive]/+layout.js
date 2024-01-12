import { groupby } from '$lib/misc/algorithm.js';

export async function load(event) {
  const { drives } = await event.parent();
  const { drive: slug } = event.params;

  /** @type {import('$lib/types').Drive} */
  const drive = await event.fetch(`/api/drives/${slug}`).then(res => res.json());
  

  if (drive) {
    const groups = groupby(drive?.files ?? [], ({ mime_type }) => {
      const [type, subtype] = mime_type.split("/");
      return type === "text" || type === "application" ? "documents" : type;
    });

    const items = Object.entries(groups).map(([k, v]) => {
      return { key: k, value: k ? v.reduce((a, c) => a + c.size, 0) : 0 };
    }).sort((a, b) => a.key.localeCompare(b.key));

    const stats = {
      total: drive.total,
      items,
    }

    const tree = make_tree(drive?.files ?? []);

    return {
      drives,
      drive,
      stats,
      tree,
    }
  }

  return {
    drive,
  };
}


/**
 * @typedef {Pick<import("$lib/types").File, "id" | "parent" | "name">} File
 * @param {File[]} files 
 * @returns {import("$lib/misc/types").Tree<File>}
 */
function make_tree(files) {
  files.push({
    id: "file:root",
    name: "root"
  });

  /** @type {Record<string, import("$lib/misc/types").Tree<File>>} */
  const nodes = files.reduce((a, p) => {
    a[p.id] = {
      key: p,
      parent: null,
      children: [],
    };
    return a;
  }, Object.create(null));

  for (const id in nodes) {
    const self = nodes[id];
    if (typeof self.key.parent === "string") {
      self.parent = nodes[self.key.parent];
    }
    if (self.parent) {
      self.parent.children.push(self);
    }
  }
  return nodes["file:root"];
}
