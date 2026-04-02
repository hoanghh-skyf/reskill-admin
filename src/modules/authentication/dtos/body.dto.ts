import type { ETokenType } from "@/shared/constants";

export type TSignInBodyDto = {
  email: string;
  password: string;
};

export type TVerifyTokenBodyDto = {
  token: string;
  type: ETokenType;
  email: string;
};

export type TVerifyLoginOTPBodyDto = {
  token: string;
  code: string;
};

export type TForgotPasswordBodyDto = {
  email: string;
};

export type TResetPasswordBodyDto = {
  newPassword: string;
  confirmNewPassword: string;
};

export type TChangePasswordBodyDto = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type TResendLoginTokenBodyDto = {
  token: string;
};
