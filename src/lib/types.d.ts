type ID = string;

type Record<T> = T | ID;

type __base = {
  id: ID,
  created_at: string,
  updated_at: string,
  user?: Record<User>,
}

type __base_public = Omit<__base, "user">;

export type User = __base_public & {
  name: string,
  email: string,
  quota: number,
  icon: string,
  plan: {
    name: string,
    drive: number,
    space: number,
  },
};

export type GrantType = (
  "PP" |
  "OTP" |
  "AK"
);

export type Token = {
  scheme: "Bearer",
  expiry: number,
  access_token: string,
  refresh_token: string,
};

export type Session = {
  user: User,
  token: string,
};

export type Key = __base & {
  name: string,
  scopes: string[],
  accessed_at: string,
  secret?: string,
  secret_masked: string,
};

export type Drive = __base & {
  name: string,
  slug: string,
  icon: string,
  used: number,
  total: number,
  default: boolean,
  readonly: boolean,
  files?: File[],
};

type FileState = (
  "created" |
  "embedding"
);

export type FileMove = {
  from: string,
  to: string,
};

export type File = __base & {
  name: string,
  public: boolean,
  state: FileState,
  accessed_at?: string,
  drive: Record<Drive>,
  parent?: Record<File>,
  blob: Record<Blob>,
  hash: string,
  mime_type: string,
  size: number,
  depth: number,
};


export type Blob = __base_public & {
  hash?: string,
  hash_pre?: string,
  mime_type: string,
  size: number,
  slices: Record<Slice>[],
  progress: number,
};

export type Slice = __base & {
  blob: Record<Blob>,
  size: number,
  offset: number,
  url: string,
  hash: string,
  hash_name: HashName,
};

export type HashName = (
  "sha-1"
);


