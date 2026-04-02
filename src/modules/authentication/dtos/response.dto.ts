import type { EUserRole } from "@/shared/constants";

export type TSignInResponseDto = {
  verify_token: string;
};

export type TGetMeResponseDto = {
  id: string;
  email: string;
  role: EUserRole;
  is_active: boolean;
};

export type TVerifyLoginOTPResponseDto = {
  access_token: string;
};

export type TRefreshTokenResponseDto = TVerifyLoginOTPResponseDto;
