import jwt from "jsonwebtoken";
import { surreal } from "$lib/clients/surreal";
import { fetch_private_secret } from "./secrets";

/** 
 * @typedef {Pick<import("../types").User, "id" | "token">} Auth 
 */

/**
 * @param {Request} request
 * @param {import("@sveltejs/kit").Cookies} [cookies]
 * @returns {Promise<Auth>}
 */
export async function authenticate(request, cookies) {
  /** @type {string=} */
  let token;

  // let's first try cookies
  token = cookies?.get("hb-auth");
  if (token) {
    return verify(token);
  }

  // try bearer token
  token = request.headers.get("Authorization") || undefined;
  if (token) {
    return verify(token.startsWith("Bearer") ? token.slice(7) : undefined);
  }

  // try X-API-Key
  token = request.headers.get("X-API-Key") || undefined;
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


/**
 * 
 * @param {string} [token]
 * @returns {Promise<Auth>} 
 */
async function verify(token) {
  let claims;
  if (token) {
    try {
      claims = jwt.verify(token, await fetch_private_secret());
    } catch {}
  }
  return {
    id: typeof claims?.sub === "string" ? claims.sub : "",
    token,
  } 
}
