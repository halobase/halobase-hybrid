import { TOKEN_SECRET } from "$env/static/private";

/** @returns {Promise<string>} */
export async function fetch_private_secret() {
  // for now we just return from the private environment variables.
  return TOKEN_SECRET;
}
