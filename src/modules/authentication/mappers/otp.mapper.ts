import type { TVerifyLoginOTPDataSource } from "../data_source/response.data_source";
import type {
  TResendLoginTokenBodyDto,
  TVerifyLoginOTPBodyDto,
  TVerifyLoginOTPResponseDto,
} from "../dtos";
import type { TResendLoginOTPSchema, TVerifyLoginOTPSchema } from "../schemas";

export const toResendLoginOTPBodyDto = ({
  resendLoginOTPSchema,
}: {
  resendLoginOTPSchema: TResendLoginOTPSchema;
}): TResendLoginTokenBodyDto => {
  return {
    token: resendLoginOTPSchema.token,
  };
};

export const toVerifyLoginOTPBodyDto = ({
  verifyLoginOTPSchema,
}: {
  verifyLoginOTPSchema: TVerifyLoginOTPSchema;
}): TVerifyLoginOTPBodyDto => {
  return {
    token: verifyLoginOTPSchema.token,
    code: verifyLoginOTPSchema.otp,
  };
};

export const toVerifyLoginOTPDataSource = ({
  verifyLoginOTPResponseDto,
}: {
  verifyLoginOTPResponseDto: TVerifyLoginOTPResponseDto;
}): TVerifyLoginOTPDataSource => {
  return {
    accessToken: verifyLoginOTPResponseDto.access_token,
  };
};
