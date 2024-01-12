import { surreal } from '$lib/clients/surreal';

/**
 * @typedef {import("@sveltejs/kit").RequestEvent<{
 *   drive: string,
 * }>} RequestEvent
 */

/**
 * @param {RequestEvent} event
 * @param {string} token
 * @returns {Promise<string?>} 
 */
export async function get_drive_id(event, token) {
  const { drive } = event.params;
  const by_id = drive.startsWith("drive:");
  if (by_id) {
    return drive;
  }
  const [[id]] = await surreal.query(
    "select value id from drive where slug = $slug",
    { slug: drive },
    token,
  );
  return id;
}