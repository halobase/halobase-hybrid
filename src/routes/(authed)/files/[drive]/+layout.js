export async function load(event) {
  const { drives } = await event.parent();
  const { drive: drive_name } = event.params;

  const drive = drives.find((d) => d.name === drive_name);

  if (drive) {
    /** @type {import('$lib/types').File[]} */
    const files = await event.fetch(`/api/drives/${drive?.id}/files`).then(res => res.json());
    drive.files = files;
  }

  return {
    drive,
  };
}