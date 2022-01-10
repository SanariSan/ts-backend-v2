type TRequestValidatedTokenAccess = Request & {
  headers: {
    authorization: string;
  };
};
type TRequestValidatedTokenRefresh = Request & {
  body: {
    refreshToken: string;
  };
};
type TRequestValidatedCredentials = Request & {
  body: {
    email: string;
    newPassword: string;
  };
};
type TRequestValidatedCredentialsChange = Request & {
  body: {
    oldPassword: string;
    newPassword: string;
  };
};

export type {
  TRequestValidatedTokenAccess,
  TRequestValidatedTokenRefresh,
  TRequestValidatedCredentials,
  TRequestValidatedCredentialsChange,
};
