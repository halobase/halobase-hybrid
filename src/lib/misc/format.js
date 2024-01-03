const KiB = 1024,
  MiB = KiB * 1024,
  GiB = MiB * 1024;

/** @param {number} n */
export function iec80000_bytes(n) {
  if (n == 0) return "-";
  if (n < KiB) return n;
  if (n < MiB) return `${(n / KiB).toFixed(1)} KiB`;
  if (n < GiB) return `${(n / MiB).toFixed(1)} MiB`;
  return `${(n / GiB).toFixed(1)} GiB`;
}

/** @param {string | number} [t]  */
export function locale_datetime(t) {
  if (typeof t == "string" || typeof t == "number")
    return new Date(t).toLocaleString();
  return "-"
}