export type GrantType = (
  "PP"          |
  "OTP" |
  "AK"
);

export type User = {
  id: string;
  email: string;
  quota: string;
};

export type Token = {
  scheme: "Bearer";
  expiry: number;
  access_token: string;
  refresh_token: string;
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
