import { redirect } from '@sveltejs/kit';

export async function load(event) {
  const auth = event.cookies.get("hb-auth");
  if (!auth) {
    const location = `/onboard?redirect_to=${event.url.pathname}`;
    throw redirect(303, location);
  }

  // inspect
  const user = await event.fetch("/api/auth/me").then(res => res.json());

  /** @type {import("$lib/types").Session} */
  const session = {
    user
  };

  const slugs = (await import("$lib/meta.json")).slugs;
  
  return {
    slugs,
    session,
  }
}