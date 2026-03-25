import { HttpStatusCode } from "axios";
import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { EErrorType, EResponseStatus } from "@/shared/constants";
import type { TError, TErrorFields } from "@/shared/types";

const fallbackShape = (message: string): TError => ({
  status: EResponseStatus.ERROR,
  code: HttpStatusCode.InternalServerError,
  message,
  error: null,
});

const toErrorMessage = (value: string | string[]) =>
  Array.isArray(value) ? (value[0] ?? "") : value;

const isErrorFields = (error: unknown): error is TErrorFields => {
  return typeof error === "object" && error !== null && "type" in error;
};

const isFormattedError = (error: unknown): error is TError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    "message" in error &&
    "code" in error &&
    "error" in error &&
    (error as TError).status === EResponseStatus.ERROR
  );
};

const toErrorFields = (value: unknown): TErrorFields | null => {
  if (!isErrorFields(value)) return null;

  const normalized: Record<string, string | string[]> = {};
  Object.entries(value).forEach(([key, val]) => {
    if (key === "type") return;
    if (typeof val === "string") normalized[key] = val;
    if (Array.isArray(val) && val.every((item) => typeof item === "string")) {
      normalized[key] = val;
    }
  });

  const type =
    value.type === EErrorType.VALIDATION || value.type === EErrorType.BUSINESS
      ? value.type
      : EErrorType.BUSINESS;

  return {
    ...normalized,
    type,
  };
};

export const toErrorShape = (error: unknown): TError => {
  if (isFormattedError(error)) return error;

  if (typeof error === "string") {
    return fallbackShape(error);
  }

  if (error instanceof Error) {
    return fallbackShape(error.message || "Something went wrong");
  }

  if (typeof error !== "object" || error === null) {
    return fallbackShape("Something went wrong");
  }

  const record = error as Record<string, unknown>;
  const message =
    typeof record.message === "string"
      ? record.message
      : "Something went wrong";
  const code =
    typeof record.code === "number"
      ? (record.code as HttpStatusCode)
      : HttpStatusCode.InternalServerError;

  return {
    status: EResponseStatus.ERROR,
    code,
    message,
    error: toErrorFields(record.error),
  };
};

export const actionWithError = async <T extends FieldValues>({
  setError,
  error,
  onError,
}: {
  setError?: UseFormSetError<T>;
  error: unknown;
  onError?: (error: TError) => void;
}) => {
  let handledError = error as TError;

  if (!onError && !setError) {
    handledError = fallbackShape("Missing params on actionWithError");
  }

  if (onError) {
    onError(handledError);
    return;
  }

  if (isErrorFields(handledError.error)) {
    Object.entries(handledError.error).forEach(([field, message]) => {
      if (field === "type") return;
      if (setError) {
        setError(field as Path<T>, {
          type: "manual",
          message: toErrorMessage(message),
        });
      }
    });
    return;
  }

  if (setError) {
    setError("root", {
      type: "manual",
      message: handledError.message,
    });
  }
};
