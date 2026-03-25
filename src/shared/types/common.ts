import type { HttpStatusCode } from "axios";
import type { EErrorType, EResponseStatus } from "../constants";

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

export type TClientResponse<T = unknown> = {
  status: EResponseStatus;
  data: T;
};
