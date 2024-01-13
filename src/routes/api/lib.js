import { db } from "$lib/clients/db";


/**
 * @template {Partial<Record<string, string>>} T
 * @typedef {import("@sveltejs/kit").RequestEvent<T>} RequestEvent<T>
 */

/**
 * @param {RequestEvent<{
 *   file: string,
 * }>} event
 * @param {string} token 
 */
export function get_file_id(event, token) {
  const { file } = event.params;
  return file.startsWith("file:") ? file : `file:${file}`;
}

/**
 * @param {RequestEvent<{
 *   drive: string,
 * }>} event
 * @param {string} token
 * @returns {Promise<string?>} 
 */
export async function get_drive_id(event, token) {
  const { drive } = event.params;
  const by_id = drive.startsWith("drive:");
  if (by_id) {
    return drive;
  }
  const [[id]] = await db.query(
    "select value id from drive where slug = $slug",
    { slug: drive },
    token,
  );
  return id;
}
