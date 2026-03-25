import type { TSignInBodyDto } from "../dtos";
import type { TSignInSchema } from "../schemas";

export const toSignInBodyDto = ({
  signInSchema,
}: {
  signInSchema: TSignInSchema;
}): TSignInBodyDto => {
  return {
    email: signInSchema.email,
    password: signInSchema.password,
  };
};
