import { groupby } from '$lib/misc/algorithm.js';

export async function load(event) {
  const { drives } = await event.parent();
  const { drive: slug } = event.params;

  const drive = drives.find((d) => d.slug === slug);

  if (drive) {
    /** @type {import('$lib/types').File[]} */
    const files = await event.fetch(`/api/drives/${drive?.id}/files`).then(res => res.json());
    drive.files = files;

    const groups = groupby(drive?.files || [], ({ mime_type }) => {
      const [type, subtype] = mime_type.split("/");
      return type === "text" || type === "application" ? "documents" : type;
    });

    const items = Object.entries(groups).map(([k, v]) => {
      return { key: k, value: v.reduce((a, c) => a + c.size, 0) };
    });

    drive.used = items.reduce((a, c) => a + c.value, 0);
    const stats = {
      total: drive.total,
      items,
    }

    return {
      drive,
      stats
    }
  }

  return {
    drive,
  };
}