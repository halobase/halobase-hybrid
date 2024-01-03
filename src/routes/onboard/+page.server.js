import { SURREAL_DB, SURREAL_NS } from '$env/static/private';
import { surreal } from '$lib/clients/surreal';
import { fetch_private_secret } from '$lib/server/secrets.js';
import { fail } from '@sveltejs/kit';
import jwt from "jsonwebtoken";

export const actions = {
  default: async function (event) {
    const form = await event.request.formData();
    /** @type {import("$lib/types").GrantType} */
    // @ts-ignore
    const grant_type = form.get("grant_type")?.toString();
    const email = form.get("email")?.toString();
    const secret = form.get("secret")?.toString();

    /** @type {import("$lib/types").User} */
    let user;
    switch (grant_type) {
      case "PP":
        try {
          const results = await surreal.query(`
          let $user = select * from user where email = $email;
          if !$user then
            return (create user content {
              email: $email,
              secret: $secret
            });
          else if crypto::argon2::compare($user[0].secret, $secret) then
            return $user;
          else
            return null;
          end
        `, {
            email,
            secret
          });
          if (results.length != 2 || !results[1]) {
            return Response.json(
              { message: "bad request" },
              { status: 400 }
            )
          }
          // @ts-ignore
          user = results[1][0];
        } catch (e) {
          return fail(500, {
            message: (e instanceof Error) ?
              e.message : "unexpected error occurred."
          });
        }
        break;
      default:
        return fail(400, {
          message: `Grantting by ${grant_type} is not available yet`
        });
    }

    const expiry = Date.now() + (60 * 60 * 24) * 1000;  // 24h
    const access_token = jwt.sign({
      iss: "halobase.dev",
      sub: user.id,
      exp: expiry,
      ns: SURREAL_NS,
      db: SURREAL_DB,
      sc: "user",
      tk: "user"
    }, await fetch_private_secret());

    /** @type {import("$lib/types").Token} */
    const token = {
      scheme: "Bearer",
      expiry,
      access_token,
      refresh_token: ""  // TODO
    };

    event.cookies.set("hb-auth", `Bearer ${access_token}`, {
      expires: new Date(expiry),
      path: "/",
    });

    return token;
  },
};


