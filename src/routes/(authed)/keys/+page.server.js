import { surreal } from '$lib/clients/surreal.js';
import { fail } from '@sveltejs/kit';

export const actions = {
  // create a key
  create: async function (event) {
    const form = await event.request.formData();
    const scopes = form.getAll("scope").map(v => v.toString());
    if (!scopes) {
      return fail(400, {
        message: "missing scopes."
      });
    }
    const auth = event.cookies.get("hb-auth");
    if (!auth) {
      return fail(401, {
        message: "unauthorized."
      })
    }
    const secret = crypto.randomUUID().replaceAll("-", "");
    const secret_masked = secret.slice(-4);
    try {
      const [key] = await surreal.create("key", {
        name: form.get("name")?.toString(),
        secret,
        secret_masked,
        scopes,
      }, auth);
      key.secret = secret;
      return key;
    } catch (e) {
      return fail(500, {
        message: (e instanceof Error) ?
          e.message : e
      });
    }
  },
  // delete a key
  delete: async function (event) {
    const auth = event.cookies.get("hb-auth");
    if (!auth) {
      return fail(401, {
        message: "unauthorized."
      })
    }
    const form = await event.request.formData();
    const id = form.get("id")?.toString();
    if (!id) {
      return fail(400, {
        message: "no API key specified to revoke."
      });
    }
    const [key] = await surreal.delete(id, auth);
    return key;
  },
};