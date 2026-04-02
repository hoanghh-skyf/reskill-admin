"use server";

import { AuthError } from "next-auth";
import { signIn as authSignIn } from "@/auth";
import { EResponseStatus } from "@/shared/constants";
import {
  ClientResponseFormatter,
  type TError,
  toErrorShape,
} from "@/shared/lib/errors";
import type { TClientResponse } from "@/shared/types";
import {
  forgotPassword,
  getMe,
  resendLoginOTP,
  resetPassword,
  signIn,
  verifyLoginOTP,
  verifyToken,
} from "./apis";
import type {
  TGetMeDataSource,
  TSignInDataSource,
  TVerifyLoginOTPDataSource,
} from "./data_source/response.data_source";
import {
  toForgotPasswordDto,
  toGetMeDataSource,
  toResendLoginOTPBodyDto,
  toResetPasswordDto,
  toSignInDataSource,
  toSignInDto,
  toVerifyLoginOTPBodyDto,
  toVerifyLoginOTPDataSource,
  toVerifyTokenBodyDto,
} from "./mappers";
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
}): Promise<TClientResponse<TSignInDataSource | TError>> => {
  try {
    const validated = signInSchema.safeParse(signInBody);
    if (!validated.success) {
      throw new Error(JSON.stringify(validated.error));
    }
    const transformed = toSignInDto({ signInSchema: validated.data });
    const res = await signIn({ body: transformed });

    if (!res.data.data) {
      return ClientResponseFormatter({
        data: toErrorShape("Failed to sign in"),
        status: EResponseStatus.ERROR,
      });
    }
    const dataSource = toSignInDataSource({ signInResponseDto: res.data.data });

    return ClientResponseFormatter<TSignInDataSource>({
      data: dataSource,
      status: EResponseStatus.SUCCESS,
    });
  } catch (error) {
    const apiError = error as TError;
    return ClientResponseFormatter({
      data: toErrorShape(apiError),
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
    const apiError = error as TError;
    return ClientResponseFormatter({
      data: toErrorShape(apiError),
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
    const apiError = error as TError;
    return ClientResponseFormatter({
      data: toErrorShape(apiError),
      status: EResponseStatus.ERROR,
    });
  }
};

export const verifyLoginOTPAction = async ({
  verifyLoginOTPBody,
}: {
  verifyLoginOTPBody: TVerifyLoginOTPSchema;
}): Promise<
  TClientResponse<TVerifyLoginOTPDataSource | undefined | TError>
> => {
  try {
    const validated = verifyLoginOTPSchema.safeParse(verifyLoginOTPBody);
    if (!validated.success) {
      throw new Error(validated.error.message);
    }

    const transformed = toVerifyLoginOTPBodyDto({
      verifyLoginOTPSchema: validated.data,
    });

    const res = await verifyLoginOTP({ body: transformed });

    if (!res.data.data) {
      return ClientResponseFormatter({
        data: toErrorShape("Failed to verify login OTP"),
        status: EResponseStatus.ERROR,
      });
    }

    const dataSource = toVerifyLoginOTPDataSource({
      verifyLoginOTPResponseDto: res.data.data,
    });

    return ClientResponseFormatter<TVerifyLoginOTPDataSource>({
      data: dataSource,
      status: EResponseStatus.SUCCESS,
    });
  } catch (error) {
    const apiError = error as TError;
    return ClientResponseFormatter({
      data: toErrorShape(apiError),
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
    const transformed = toForgotPasswordDto({
      forgotPasswordSchema: validated.data,
    });
    const res = await forgotPassword({ body: transformed });
    return ClientResponseFormatter({
      data: res.data,
      status: EResponseStatus.SUCCESS,
    });
  } catch (error) {
    const apiError = error as TError;
    return ClientResponseFormatter({
      data: toErrorShape(apiError),
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
    const transformed = toResetPasswordDto({
      resetPasswordSchema: validated.data,
    });
    const res = await resetPassword({ body: transformed, token });
    return ClientResponseFormatter({
      data: res.data,
      status: EResponseStatus.SUCCESS,
    });
  } catch (error) {
    const apiError = error as TError;
    return ClientResponseFormatter({
      data: toErrorShape(apiError),
      status: EResponseStatus.ERROR,
    });
  }
};

export const authSignInAction = async ({ token }: { token: string }) => {
  try {
    await authSignIn("credentials", {
      token,
      redirect: false,
    });

    return ClientResponseFormatter({
      data: null,
      status: EResponseStatus.SUCCESS,
    });
  } catch (error) {
    const apiError = (
      error instanceof AuthError
        ? new Error(
            error.type === "CredentialsSignin"
              ? "Invalid email or password"
              : "Unable to sign in. Please try again.",
          )
        : error
    ) as TError;
    return ClientResponseFormatter({
      data: toErrorShape(apiError),
      status: EResponseStatus.ERROR,
    });
  }
};

export const getMeAction = async (): Promise<
  TClientResponse<TGetMeDataSource | TError>
> => {
  try {
    const res = await getMe();

    if (res.data.status === EResponseStatus.ERROR) {
      return ClientResponseFormatter({
        data: toErrorShape(res.data.message),
        status: EResponseStatus.ERROR,
      });
    }

    if (!res.data.data) {
      return ClientResponseFormatter({
        data: toErrorShape("User not found"),
        status: EResponseStatus.ERROR,
      });
    }

    const dataSource = toGetMeDataSource({ getMeResponseDto: res.data.data });

    return ClientResponseFormatter<TGetMeDataSource>({
      data: dataSource,
      status: EResponseStatus.SUCCESS,
    });
  } catch (error) {
    const apiError = error as TError;
    return ClientResponseFormatter({
      data: toErrorShape(apiError),
      status: EResponseStatus.ERROR,
    });
  }
};
