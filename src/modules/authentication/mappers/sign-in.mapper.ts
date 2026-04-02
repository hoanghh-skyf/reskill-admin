import type { TSignInDataSource } from "../data_source/response.data_source";
import type { TSignInBodyDto, TSignInResponseDto } from "../dtos";
import type { TSignInSchema } from "../schemas";

export const toSignInDto = ({
  signInSchema,
}: {
  signInSchema: TSignInSchema;
}): TSignInBodyDto => {
  return {
    email: signInSchema.email,
    password: signInSchema.password,
  };
};

export const toSignInDataSource = ({
  signInResponseDto,
}: {
  signInResponseDto: TSignInResponseDto;
}): TSignInDataSource => {
  return {
    verifyToken: signInResponseDto.verify_token,
  };
};
