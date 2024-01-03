/**
 * @template T, K
 * @param {T[]} a
 * @param {(o: T) => K} f
 * @returns {Record<K, T[]>}
 */
export function groupby(a, f) {
  return a.reduce((ac, o) => {
    const k = f(o);
    (ac[k] = ac[k] || []).push(o);
    return ac;
  }, Object.create(null));
}
