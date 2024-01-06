/**
 * Taken from https://stackoverflow.com/questions/40031688/javascript-arraybuffer-to-hex
 * @param {ArrayBuffer} b 
 * @returns {string}
 */
export function hex(b) {
  return [...new Uint8Array(b)]
    .map(x => x.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * @template T
 * @param {Response} res 
 * @returns {Promise<[T | undefined, {
 *   message: string,
 *   detail?: string,
 * } | undefined]>}
 */
export async function deserialize_response(res) {
  const type = res.headers.get("Content-Type") || "text/plain";
  const body = type === "text/plain" ?
    await res.text() : await res.json();
  if (res.ok) {
    return [body, undefined];
  }
  return [
    undefined,
    typeof body === "string" ? { message: body } : body
  ]
}
