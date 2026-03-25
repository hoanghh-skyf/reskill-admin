export type TSignInBodyDto = {
  email: string;
  password: string;
};

export type TSignInResponseDto = {
  verify_token: string;
};
