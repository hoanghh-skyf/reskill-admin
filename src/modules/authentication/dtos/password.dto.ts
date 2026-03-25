export type TForgotPasswordBodyDto = {
  email: string;
};

export type TResetPasswordBodyDto = {
  newPassword: string;
  confirmNewPassword: string;
};
