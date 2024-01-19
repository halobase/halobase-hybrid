export async function load(event) {
  /** @type {import("$lib/types").AI[]} */
  const ais = await event.fetch("/api/ais").then(res => res.json());
  return {
    ais,
  }
}