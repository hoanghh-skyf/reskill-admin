import type { HttpStatusCode } from "axios";
import type { EErrorType, EResponseStatus } from "@/shared/constants/enum";

export type TFieldErrors = Record<string, string>;
export type TFormattedError = string | TFieldErrors;

export type TErrorFields = {
  [key: string]: string | string[];
  type: EErrorType;
};

export type TError = {
  status: EResponseStatus.ERROR;
  code: HttpStatusCode;
  message: string;
  error: TErrorFields | null;
};
