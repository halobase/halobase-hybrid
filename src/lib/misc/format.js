import { GiB, KiB, MiB, TiB } from "./consts";

/** 
 * Converts an integer representing bytes into human readable format.
 * @param {number} n
 * @param {number} [p]
 * @returns {string}
 */
export function iec80000_bytes(n, p) {
  p = p || 1;
  if (n < KiB) return `${n} B`;
  if (n < MiB) return `${(n / KiB).toFixed(p)} KiB`;
  if (n < GiB) return `${(n / MiB).toFixed(p)} MiB`;
  if (n < TiB) return `${(n / GiB).toFixed(p)} GiB`;
  return `${(n / TiB).toFixed(p)} TiB`;
}

/** @param {string | number} [t]  */
export function locale_datetime(t) {
  if (typeof t == "string" || typeof t == "number")
    return new Date(t).toLocaleString();
  return "-"
}

/** @param {string} text  */
export function to_slug(text) {
  return text.toLowerCase().replace(/\s+/g, "-");
}
