export async function load(event) {
  const { drives } = await event.parent();
  const { drive: slug } = event.params;

  const drive = drives.find((d) => d.slug === slug);

  if (drive) {
    /** @type {import('$lib/types').File[]} */
    const files = await event.fetch(`/api/drives/${drive?.id}/files`).then(res => res.json());
    drive.files = files;
  }

  return {
    drive,
  };
}