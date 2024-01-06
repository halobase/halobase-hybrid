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
  result: T;
  detail?: string;
};

export interface Store {
  create<T>(thing: string, data: Partial<T>, auth?: Auth): Promise<T[]>;
  update<T>(thing: string, data: Partial<T>, auth?: Auth): Promise<T[]>;
  select<T>(thing: string, auth?: Auth): Promise<T[]>;
  delete<T>(thing: string, auth?: Auth): Promise<T[]>;
  // query<T extends any[]>(sql: string, data?: Record<string, unknown>, auth?: Auth): Promise<T>;
};
