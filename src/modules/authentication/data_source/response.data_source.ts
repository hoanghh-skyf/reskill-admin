import type { EUserRole } from "@/shared/constants";

export type TSignInDataSource = {
  verifyToken: string;
};

export type TGetMeDataSource = {
  id: string;
  email: string;
  role: EUserRole;
  isActive: boolean;
};

export type TVerifyLoginOTPDataSource = {
  accessToken: string;
};

export type TRefreshTokenDataSource = TVerifyLoginOTPDataSource;
