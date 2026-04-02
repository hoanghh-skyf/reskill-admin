import type { EResponseStatus } from "../constants";
import type { TFieldErrors, TFormattedError } from "../lib/errors";

export type TClientResponse<T = unknown> = {
  status: EResponseStatus;
  data: T;
};

export type TApiResponse<T = unknown> = {
  status: EResponseStatus;
  code: number;
  message: TFieldErrors | string;
  data?: T;
  errors?: TFormattedError;
};
