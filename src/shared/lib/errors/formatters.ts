import type { AxiosError } from "axios";
import { type EResponseStatus, ERROR_MESSAGES } from "@/shared/constants";
import type { TApiResponse, TClientResponse } from "@/shared/types";

export const errorFormatter = (error: unknown) => {
  const requestError = error as AxiosError<TApiResponse>;

  const errorData = requestError.response?.data.message;

  if (!errorData) return ERROR_MESSAGES.common;

  if (typeof errorData === "string") return errorData;

  const listErrorKeys = Object.keys(errorData);
  const errorHandled: Record<string, string> = {};

  listErrorKeys.forEach((key) => {
    errorHandled[key] = errorData[key][0];
  });

  return errorHandled;
};

export const ClientResponseFormatter = <T>({
  data,
  status,
}: {
  data: T;
  status: EResponseStatus;
}): TClientResponse<T> => {
  return {
    status,
    data,
  };
};
