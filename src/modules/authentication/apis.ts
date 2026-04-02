import { API_ROUTES, ETokenType } from "@/shared/constants";
import apiClient from "@/shared/lib/api-client";
import type { TApiResponse } from "@/shared/types";
import type {
  TForgotPasswordBodyDto,
  TGetMeResponseDto,
  TResendLoginTokenBodyDto,
  TResetPasswordBodyDto,
  TSignInBodyDto,
  TSignInResponseDto,
  TVerifyLoginOTPBodyDto,
  TVerifyLoginOTPResponseDto,
  TVerifyTokenBodyDto,
} from "./dtos";

export const signIn = async ({ body }: { body: TSignInBodyDto }) => {
  return await apiClient.post<TApiResponse<TSignInResponseDto>>(
    API_ROUTES.AUTH.SIGN_IN,
    body,
  );
};

export const verifyToken = async ({ body }: { body: TVerifyTokenBodyDto }) => {
  const verifyTokenURL =
    body.type === ETokenType.LOGIN
      ? API_ROUTES.AUTH.VERIFY_LOGIN_TOKEN
      : API_ROUTES.AUTH.VERIFY_FORGOT_PASSWORD_TOKEN;

  const res = await apiClient.post<TApiResponse<unknown>>(verifyTokenURL, body);
  return res.data;
};

export const resendLoginOTP = async ({
  body,
}: {
  body: TResendLoginTokenBodyDto;
}) => {
  const params = new URLSearchParams(API_ROUTES.AUTH.RESEND_LOGIN_TOKEN);
  params.set("token", body.token);
  return await apiClient.post(
    `${API_ROUTES.AUTH.RESEND_LOGIN_TOKEN}?${params.toString()}`,
    body,
  );
};

export const verifyLoginOTP = async ({
  body,
}: {
  body: TVerifyLoginOTPBodyDto;
}) => {
  return await apiClient.post<TApiResponse<TVerifyLoginOTPResponseDto>>(
    `${API_ROUTES.AUTH.VERIFY_LOGIN_OTP}`,
    body,
  );
};

export const forgotPassword = async ({
  body,
}: {
  body: TForgotPasswordBodyDto;
}) => {
  return await apiClient.post<TApiResponse<void>>(
    `${API_ROUTES.AUTH.FORGOT_PASSWORD}`,
    body,
  );
};

export const resetPassword = async ({
  body,
  token,
}: {
  body: TResetPasswordBodyDto;
  token: string;
}) => {
  return await apiClient.post<TApiResponse<void>>(
    `${API_ROUTES.AUTH.RESET_PASSWORD}?token=${token}`,
    body,
  );
};

export const getMe = async () => {
  return await apiClient.get<TApiResponse<TGetMeResponseDto>>(
    API_ROUTES.AUTH.ME,
  );
};
