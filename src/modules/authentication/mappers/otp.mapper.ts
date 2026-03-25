import type {
  TResendLoginTokenBodyDto,
  TVerifyLoginOTPBodyDto,
} from "../dtos/otp.dto";
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
