import type { TGetMeDataSource } from "../data_source/response.data_source";
import type { TGetMeResponseDto } from "../dtos";

export const toGetMeDataSource = ({
  getMeResponseDto,
}: {
  getMeResponseDto: TGetMeResponseDto;
}): TGetMeDataSource => {
  return {
    id: getMeResponseDto.id,
    email: getMeResponseDto.email,
    role: getMeResponseDto.role,
    isActive: getMeResponseDto.is_active,
  };
};
