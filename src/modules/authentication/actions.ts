"use server";

import { EResponseStatus } from "@/shared/constants";
import { ClientResponseFormatter, toErrorShape } from "@/shared/lib/errors";
import {
  forgotPassword,
  resendLoginOTP,
  resetPassword,
  signIn,
  verifyLoginOTP,
  verifyToken,
} from "./apis";
import {
  toResendLoginOTPBodyDto,
  toSignInBodyDto,
  toVerifyLoginOTPBodyDto,
  toVerifyTokenBodyDto,
} from "./mappers";
import {
  toForgotPasswordBodyDto,
  toResetPasswordBodyDto,
} from "./mappers/password.dto";
import {
  forgotPasswordSchema,
  resendLoginOTPSchema,
  resetPasswordSchema,
  signInSchema,
  type TForgotPasswordSchema,
  type TResendLoginOTPSchema,
  type TResetPasswordSchema,
  type TSignInSchema,
  type TVerifyLoginOTPSchema,
  type TVerifyTokenSchema,
  verifyLoginOTPSchema,
  verifyTokenSchema,
} from "./schemas";

export const signInAction = async ({
  signInBody,
}: {
  signInBody: TSignInSchema;
}) => {
  try {
    const validated = signInSchema.safeParse(signInBody);
    if (!validated.success) {
      throw new Error(JSON.stringify(validated.error));
    }
    const transformed = toSignInBodyDto({ signInSchema: validated.data });
    const res = await signIn({ body: transformed });

    if (!res.data.data) {
      return ClientResponseFormatter({
        data: toErrorShape("Failed to sign in"),
        status: EResponseStatus.ERROR,
      });
    }

    return ClientResponseFormatter({
      data: res.data.data,
      status: EResponseStatus.SUCCESS,
    });
  } catch (error) {
    const apiError = error as Error;
    return ClientResponseFormatter({
      data: toErrorShape(apiError.message),
      status: EResponseStatus.ERROR,
    });
  }
};

export const verifyTokenAction = async ({
  verifyTokenBody,
}: {
  verifyTokenBody: TVerifyTokenSchema;
}) => {
  try {
    const validated = verifyTokenSchema.safeParse(verifyTokenBody);
    if (!validated.success) {
      throw new Error(JSON.stringify(validated.error));
    }
    const transformed = toVerifyTokenBodyDto({
      verifyTokenSchema: validated.data,
    });
    const data = await verifyToken({ body: transformed });
    return ClientResponseFormatter({
      data,
      status: EResponseStatus.SUCCESS,
    });
  } catch (error) {
    const apiError = error as Error;
    return ClientResponseFormatter({
      data: toErrorShape(apiError.message),
      status: EResponseStatus.ERROR,
    });
  }
};

export const resendLoginOTPAction = async ({
  resendLoginOTPBody,
}: {
  resendLoginOTPBody: TResendLoginOTPSchema;
}) => {
  try {
    const validated = resendLoginOTPSchema.safeParse(resendLoginOTPBody);
    if (!validated.success) {
      throw new Error(JSON.stringify(validated.error));
    }
    const transformed = toResendLoginOTPBodyDto({
      resendLoginOTPSchema: validated.data,
    });
    const res = await resendLoginOTP({ body: transformed });
    return ClientResponseFormatter({
      data: res.data,
      status: EResponseStatus.SUCCESS,
    });
  } catch (error) {
    const apiError = error as Error;
    return ClientResponseFormatter({
      data: toErrorShape(apiError.message),
      status: EResponseStatus.ERROR,
    });
  }
};

export const verifyLoginOTPAction = async ({
  verifyLoginOTPBody,
}: {
  verifyLoginOTPBody: TVerifyLoginOTPSchema;
}) => {
  try {
    const validated = verifyLoginOTPSchema.safeParse(verifyLoginOTPBody);
    if (!validated.success) {
      throw new Error(validated.error.message);
    }

    const transformed = toVerifyLoginOTPBodyDto({
      verifyLoginOTPSchema: validated.data,
    });

    const res = await verifyLoginOTP({ body: transformed });

    return ClientResponseFormatter({
      data: res.data,
      status: EResponseStatus.SUCCESS,
    });
  } catch (error) {
    return ClientResponseFormatter({
      data: toErrorShape(error),
      status: EResponseStatus.ERROR,
    });
  }
};

export const forgotPasswordAction = async ({
  forgotPasswordBody,
}: {
  forgotPasswordBody: TForgotPasswordSchema;
}) => {
  try {
    const validated = forgotPasswordSchema.safeParse(forgotPasswordBody);
    if (!validated.success) {
      throw new Error(JSON.stringify(validated.error));
    }
    const transformed = toForgotPasswordBodyDto({
      forgotPasswordSchema: validated.data,
    });
    const res = await forgotPassword({ body: transformed });
    return ClientResponseFormatter({
      data: res.data,
      status: EResponseStatus.SUCCESS,
    });
  } catch (error) {
    return ClientResponseFormatter({
      data: toErrorShape(error),
      status: EResponseStatus.ERROR,
    });
  }
};

export const resetPasswordAction = async ({
  resetPasswordBody,
  token,
}: {
  resetPasswordBody: TResetPasswordSchema;
  token: string;
}) => {
  try {
    const validated = resetPasswordSchema.safeParse(resetPasswordBody);
    if (!validated.success) {
      throw new Error(JSON.stringify(validated.error));
    }
    const transformed = toResetPasswordBodyDto({
      resetPasswordSchema: validated.data,
    });
    const res = await resetPassword({ body: transformed, token });
    return ClientResponseFormatter({
      data: res.data,
      status: EResponseStatus.SUCCESS,
    });
  } catch (error) {
    return ClientResponseFormatter({
      data: toErrorShape(error),
      status: EResponseStatus.ERROR,
    });
  }
};
