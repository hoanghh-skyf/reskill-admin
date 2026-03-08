import { signIn } from "./apis";
import { toSignInBodyDto } from "./mappers/sign-in.mapper";
import { signInSchema, type TSignInSchema } from "./schema";

export const signInAction = async ({
  signInBodyDto,
}: {
  signInBodyDto: TSignInSchema;
}) => {
  const validated = await signInSchema.validate(signInBodyDto);
  const transformed = toSignInBodyDto({ signInSchema: validated });
  const res = await signIn({ body: transformed });
  return res;
};
