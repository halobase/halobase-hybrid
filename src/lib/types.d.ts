export type GrantType = (
  "PP" |
  "OTP" |
  "AK"
);

export type User = __base & {
  email: string;
  quota: number;
  icon: string;
  token?: string;
};

export type Token = {
  scheme: "Bearer";
  expiry: number;
  access_token: string;
  refresh_token: string;
};

export type Session = {
  user: User;
};

export type Key = __base & {
  name: string;
  scopes: string[];
  accessed_at: string;
  secret?: string;
  secret_masked: string;
};

type FileState = (
  "created" |
  "embedding"
);

export type File = __base & {
  // url
  drive: string;
  path: string;
  // form
  name: string;
  hash: string;
  mime_type: string;
  size: number;
  public: boolean;
  // event
  state: FileState;
  // db
  accessed_at?: string;
};

export type Drive = __base & {
  name: string;
  used: number;
  total: number;
  default: boolean;
  readonly: boolean;
  files?: File[];
};

type __base = {
  id: string;
  created_at: string;
  updated_at: string;
}
