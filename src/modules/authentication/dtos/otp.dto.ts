export type TResendLoginTokenBodyDto = {
  token: string;
};

export type TVerifyLoginOTPBodyDto = {
  token: string;
  code: string;
};
