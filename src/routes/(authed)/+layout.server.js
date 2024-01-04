import { redirect } from '@sveltejs/kit';

export async function load(event) {
  const auth = event.cookies.get("hb-auth");
  if (!auth) {
    const location = `/onboard?redirect_to=${event.url.pathname}`;
    throw redirect(303, location);
  }

  /** @type {import("$lib/types").Session} */
  const session = {
    user: {
      id: "",
      email: "admin@halobase.dev",
      quota: 250,
    }
  };

  const slugs = (await import("$lib/meta.json")).slugs;
  return {
    slugs,
    session,
  }
}