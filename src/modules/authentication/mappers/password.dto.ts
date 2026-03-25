import type { TForgotPasswordBodyDto, TResetPasswordBodyDto } from "../dtos";
import type { TForgotPasswordSchema, TResetPasswordSchema } from "../schemas";

export const toForgotPasswordBodyDto = ({
  forgotPasswordSchema,
}: {
  forgotPasswordSchema: TForgotPasswordSchema;
}): TForgotPasswordBodyDto => {
  return {
    email: forgotPasswordSchema.email,
  };
};

export const toResetPasswordBodyDto = ({
  resetPasswordSchema,
}: {
  resetPasswordSchema: TResetPasswordSchema;
}): TResetPasswordBodyDto => {
  return {
    newPassword: resetPasswordSchema.password,
    confirmNewPassword: resetPasswordSchema.confirmPassword,
  };
};
