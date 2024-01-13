export async function load(event) {
  /** @type {import("$lib/types").AI[]} */
  const ais = await event.fetch("/api/ai").then(res => res.json());
  return {
    ais,
  }
}