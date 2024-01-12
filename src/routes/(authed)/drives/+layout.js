
export async function load(event) {
  /** @type {import('$lib/types').Drive[]} */
  const drives = await event.fetch("/api/drives").then(res => res.json());

  return {
    drives,
  };
}