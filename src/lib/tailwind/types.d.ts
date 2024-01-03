import type { AnyColor } from "colord";

export type Color = AnyColor;

export type Variants = (
  "alpha" |
  "beta"  |
  "debug" |
  "info"  |
  "warn"  |
  "error" |
  "back"  |
  "fore"
);

export type Theme = {
  [K in Variants]: Color;
};

export type Options = {
  use: string[];
  default: string;
  themes: Record<string, Theme>;
  mean: number;
  scale: number;
  debug: boolean;
};

declare function plugin(opts: Partial<Options>): void;

declare namespace plugin {
  const __isOptionsFunction: true;
};

export = plugin;
