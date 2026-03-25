import type { EResponseStatus } from "@/shared/constants";
import type { TFieldErrors, TFormattedError } from "../lib/errors";

export type TApiResponse<T = unknown> = {
  status: EResponseStatus;
  code: number;
  message: TFieldErrors | string;
  data?: T;
  errors?: TFormattedError;
};
