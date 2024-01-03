export type Auth = {
  sc?: string;
  user: string;
  pass: string;
} | string;

export type Options = {
  fetch?: typeof fetch;
  auth?: Auth;
  ns: string;
  db: string;
};

export type Response<T> = {
  time: string;
  status: "OK" | "ERR";
  result: T[];
  detail?: string;
};

export declare class Surreal {
  constructor(url: string, opts?: Options);
};
