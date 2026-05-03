import { AxiosError } from "axios";
import { UNKNOWN_ERROR } from "#/shared/api/constants/api.constants";
import type {
  ApiError,
  ErrorType,
  HandleApiErrorOptions,
  Result,
} from "#/shared/types/api.types";

export const getApiError = <T>(error: unknown): Result<T, ApiError> => {
  const axiosError = error as AxiosError<{
    message: string;
    type: ErrorType;
    errors: Record<string, string>;
  }>;
  const message = axiosError.response?.data?.message || UNKNOWN_ERROR;
  const type = axiosError.response?.data?.type || "GENERAL";
  const errors = axiosError.response?.data?.errors;
  return {
    ok: false,
    error: { message, type, errors },
  };
};

export function handleApiError<TFieldErrors extends Record<string, string>>({
  error,
  setFieldErrors,
  showToast,
}: HandleApiErrorOptions<TFieldErrors>) {
  if (error.type === "VALIDATION" && error.errors && setFieldErrors) {
    setFieldErrors(error.errors as TFieldErrors);
    return;
  }

  showToast(error.message);
}
