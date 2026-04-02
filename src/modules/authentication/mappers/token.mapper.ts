import type { TVerifyTokenBodyDto } from "../dtos";
import type { TVerifyTokenSchema } from "../schemas";

export const toVerifyTokenBodyDto = ({
  verifyTokenSchema,
}: {
  verifyTokenSchema: TVerifyTokenSchema;
}): TVerifyTokenBodyDto => {
  return {
    token: verifyTokenSchema.token,
    type: verifyTokenSchema.type,
    email: verifyTokenSchema.email,
  };
};
