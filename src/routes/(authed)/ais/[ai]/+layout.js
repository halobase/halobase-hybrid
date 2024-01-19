export async function load(event) {
  /** @type {import("$lib/types").AI} */
  const ai = await event.fetch(`/api/ais/${event.params.ai}`).then(res => res.json());
  return {
    ai,
  }
}