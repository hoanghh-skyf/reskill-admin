import type { TSignInBodyDto } from "../dtos/sign-in.dto";
import type { TSignInSchema } from "../schema";

export const toSignInBodyDto = ({
  signInSchema,
}: {
  signInSchema: TSignInSchema;
}): TSignInBodyDto => {
  return {
    account: signInSchema.account,
    password: signInSchema.password,
  };
};
