import type { TVerifyTokenDto } from "../dtos";
import type { TVerifyTokenSchema } from "../schemas";

export const toVerifyTokenBodyDto = ({
  verifyTokenSchema,
}: {
  verifyTokenSchema: TVerifyTokenSchema;
}): TVerifyTokenDto => {
  return {
    token: verifyTokenSchema.token,
    type: verifyTokenSchema.type,
    email: verifyTokenSchema.email,
  };
};
