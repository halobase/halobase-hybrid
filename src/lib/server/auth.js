import { surreal } from "$lib/clients/surreal";

/**
 * @param {Request} req
 * @param {import("@sveltejs/kit").Cookies} [cookies]
 * @returns {Promise<string | undefined>}
 */
export async function authenticate(req, cookies) {
  /** @type {string=} */
  let token;

  // let's first try cookies
  token = cookies?.get("hb-auth");
  if (token) {
    return token;
  }

  // try bearer token
  token = req.headers.get("Authorization") || undefined;
  if (token) {
    return token.startsWith("Bearer") ? token.slice(7) : undefined;
  }

  // try X-API-Key
  token = req.headers.get("X-API-Key") || undefined;
  if (token) {
    return exchange(token);
  }

  // :(
  return undefined;
}

/**
 * @param {string} __key 
 * @returns {Promise<string | undefined>}
 */
async function exchange(__key) {

  if (!__key.startsWith("hk-")) {
    return undefined;
  }

  const [id, secret] = __key.replace("hk-", "key:").split(".");

  const [res] = await surreal.query(
    "select * from key where id = $id and crypto::argon2::compare(secret, $secret)",
    { id, secret },
  );

  if (!res) {
    return undefined;
  }

  /** @type {import("../types").Key} */
  const key = res[0];

  // TODO:
}
