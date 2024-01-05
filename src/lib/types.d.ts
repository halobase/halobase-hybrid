export type GrantType = (
  "PP"          |
  "OTP" |
  "AK"
);

export type User = {
  id: string;
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

export type Key = {
  id: string;
  name: string;
  scopes: string[];
  created_at: string;
  accessed_at: string;
  secret?: string;
  secret_masked: string;
};

type FileState = (
  "created"
);

export type File = {
  // db
  id: string;
  // url
  path: string;
  // form
  name: string;
  etag: string;
  mime_type: string;
  size: number;
  public: boolean;
  // event
  state: FileState;
  // db
  created_at: string;
  updated_at: string;
  accessed_at?: string;
};

