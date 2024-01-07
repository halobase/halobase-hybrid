import { redirect } from '@sveltejs/kit';

export async function load(event) {
  const token = event.cookies.get("hb-auth");

  if (!token) {
    throw redirect(303, `/onboard?redirect_to=${event.url.pathname}`);
  }

  // inspect
  const user = await event.fetch("/api/auth/me").then(res => res.json());

  /** @type {import("$lib/types").Session} */
  const session = { user };

  const slugs = (await import("$lib/meta.json")).slugs;

  return {
    slugs,
    session,
  }
}