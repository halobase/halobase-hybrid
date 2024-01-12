import { withOptions } from 'tailwindcss/plugin';
import { colord } from 'colord';
import themes from './themes';

/**
 * @typedef {import('./types').Options} Options
 * @typedef {import('./types').Theme} Theme
 * @typedef {import('./types').Variants} Variants
 * @typedef {import('tailwindcss/types/config').PluginCreator} PluginCreator
 * @typedef {import('tailwindcss/types/config').CSSRuleObject} CSSRuleObject
 */

/**
 * @param {Record<string, Theme>} themes
 * @returns {Options}
 */
function create_options(themes) {
  return {
    default: "zima_blue",
    use: Object.keys(themes),
    themes: Object.create(null),
    mean: 0.5,
    scale: 1,
    delta: 50,
    debug: false,
  }
}

export default withOptions(
  /** @type {(opts: Options) => PluginCreator} */
  function (opts) {
    opts = opts || create_options(themes);

    if (!opts.use && !opts.themes) {
      throw new Error("no theme specified to use");
    }

    for (const key of opts.use) {
      opts.themes[key] = themes[key];
    }

    return function ({ addUtilities }) {
      /** @type {CSSRuleObject} */
      const classes = {};
      const { themes, debug, mean, scale } = opts;

      /** @type {Variants} */
      let variant;
      let clazz;
      let color;
      let hsl;

      for (const key in themes) {
        /** @type {Record<string, string>} */
        const colors = Object.create(null);
        /** @type {Record<string, string>} */
        const colors_dark = Object.create(null);
        const theme = themes[key];
        for (variant in theme) {
          color = colord(theme[variant]);

          if (variant === "back" || variant === "fore") {
            clazz = `--${variant}`;
            hsl = color.toHsl();
            colors[clazz] = `${hsl.h} ${hsl.s}% ${hsl.l}%`;
            colors_dark[clazz] = `${hsl.h} ${hsl.s}% ${100 - hsl.l + 10}%`;
            continue;
          }

          clazz = `--${variant}`;
          hsl = color.brightness() < mean ?
            colord("#fff").toHsl() : colord("#000").toHsl();
          colors[clazz] = `${hsl.h} ${hsl.s}% ${hsl.l}%`;

          for (let i = 500 - scale * 100; i < 500 + (scale+1) * 100; i += 100) {
            clazz = `--${variant}-${i}`;
            hsl = color.toHsl();
            const delta = i > 500 ? opts.delta : -opts.delta;
            colors[clazz] = `${hsl.h} ${hsl.s}% ${(1000 - i + delta) / 10}%`;
            colors_dark[clazz] = `${hsl.h} ${hsl.s}% ${(i - delta) / 10}%`;
          }
        }
        classes[`.theme-${key}`] = colors;
        classes[`.theme-${key}-dark`] = colors_dark;
      }
      if (debug) {
        for (const key in classes) {
          console.info(key);
          console.table(classes[key]);
        }
      }
      addUtilities(classes);
    }
  },
  function (opts) {
    /** @type {Record<string, string>} */
    const colors = {};

    opts = opts || create_options(themes);
    const { scale } = opts;

    let clazz;
    for (const variant in themes["zima_blue"]) {
      if (variant === "back" || variant === "fore") {
        clazz = variant;
        colors[clazz] = `hsl(var(--${clazz}) / <alpha-value>)`;
        continue;
      }

      clazz = `${variant}`;
      colors[clazz] = `hsl(var(--${clazz}) / <alpha-value>)`;

      for (let i = 500 - scale * 100; i < 500 + (scale+1) * 100; i += 100) {
        clazz = `${variant}-${i}`;
        colors[clazz] = `hsl(var(--${clazz}) / <alpha-value>)`;
      }
    }
    return {
      theme: {
        colors,
      }
    }
  }
);