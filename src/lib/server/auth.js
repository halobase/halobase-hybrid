import jwt from "jsonwebtoken";
import { db } from "$lib/clients/db";
import { fetch_private_secret } from "./secrets";

const scheme = "Bearer "

/** 
 * @typedef {{
 *   token?: string,
 *   user?: Pick<
 *     import("../types").User,
 *    "id" | "plan"
 *   >,
 * }} Auth 
 */

/**
 * @param {{
 *   request: Request,
 *   cookies: {
 *     get: (
 *       key: string, 
 *       opts?: import("cookie").CookieParseOptions
 *     ) => string | undefined,
 *   },
 * }} event
 * @returns {Promise<Auth>}
 */
export async function authenticate(event) {
  /** @type {string=} */
  let token;

  // let's first try cookies
  token = event.cookies?.get("hb-auth");
  if (token) {
    return verify(token);
  }

  // try bearer token
  token = event.request.headers.get("Authorization") || undefined;
  if (token) {
    return verify(token);
  }

  // try X-API-Key
  token = event.request.headers.get("X-API-Key") || undefined;
  if (token) {
    return verify(await exchange(token));
  }

  // :(
  return verify(undefined);
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

  const [res] = await db.query(
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


/**
 * 
 * @param {string} [token]
 * @returns {Promise<Auth>} 
 */
async function verify(token) {
  if (!token?.startsWith(scheme)) {
    return {};
  }
  token = token.slice(scheme.length);
 
  try {
    /** @type {Pick<import("../types").User, "plan"> & {sub: string}} */
    // @ts-ignore
    const claims = jwt.verify(token, await fetch_private_secret());
    return {
      token,
      user: {
        id: claims.sub,
        plan: claims.plan,
      },
    }
  } catch {
    return {};
  }
}
