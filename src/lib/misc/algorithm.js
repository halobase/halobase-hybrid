import { GiB, KiB, MiB } from "./consts";

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

/**
 * @template T
 * @param {import("./types").Tree<T>} tree
 * @param {(o: T, i: number) => boolean} f
 * @returns {import("./types").Tree<T>=} 
 */
export function walk(tree, f) {
  /** @type {import("./types").Tree<T>=} */
  let p = tree, q;
  let depth = 0;
  while (!!p) {
    q = p;
    p = p?.children.find(v => f(v.key, depth));
    depth++;
  }
  return q;
}

/** 
 * @param {number} x 
 * @param {number} [x_min]
 * @param {number} [x_max]
 * @param {number} [y_min]
 * @param {number} [y_max]   
 */
export function slicing(x, x_min, x_max, y_min, y_max) {
  x_min = x_min || 256 * KiB;
  x_max = x_max || 1 * GiB;
  y_min = y_min || 256 * KiB;
  y_max = y_max || 5 * MiB;

  if (x < x_min) return y_min;
  if (x > x_max) return y_max;

  const k = (y_max - y_min) / (x_max - x_min);
  const r = Math.floor(k * (x - x_max) + y_max);
  return (r + y_min - 1) & (~(y_min - 1));  // align bytes to y_min
}


/**
 * @param {(...args: any[]) => void} f 
 * @param {number} ms 
 */
export function debounce(f, ms) {
  /** @type {string | number | NodeJS.Timeout | undefined} */
  let timer;
  return (/** @type {any[]} */ ...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      f(...args);
    }, ms);
  };
}
