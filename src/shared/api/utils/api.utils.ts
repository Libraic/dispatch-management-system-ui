import { AxiosError } from "axios";
import { UNKNOWN_ERROR } from "#/shared/api/constants/api.constants";
import type { ApiError, Result } from "#/shared/types/api.types";

export const getApiError = <T>(error: unknown): Result<T, ApiError> => {
  const axiosError = error as AxiosError<{
    message: string;
  }>;
  const message = axiosError.response?.data?.message || UNKNOWN_ERROR;
  return {
    ok: false,
    error: { message },
  };
};
