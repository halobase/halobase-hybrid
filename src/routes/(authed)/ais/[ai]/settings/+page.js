export async function load(event) {
  /** @type {import("$lib/types").Function[]} */
  const fns = await event.fetch("/api/fns").then(res => res.json());
  return {
    fns,
  }
}