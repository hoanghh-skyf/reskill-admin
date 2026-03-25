import type { ETokenType } from "@/shared/constants";

export type TVerifyTokenDto = {
  token: string;
  type: ETokenType;
  email: string;
};
