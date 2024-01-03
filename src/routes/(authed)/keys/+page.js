export async function load(event) {
  /** @type {import("$lib/types").Key[]} */
  const keys = (await event.fetch("/api/auth/keys")
    .then(res => res.json()));
  keys.sort((a, b) => (new Date(a.created_at)).getTime()
    - (new Date(b.created_at)).getTime());
  return { keys };
}
