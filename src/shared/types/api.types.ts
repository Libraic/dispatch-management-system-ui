import type {
  Error,
  GroupsErrorResponse,
} from "#/types/api/common/api-errors-types";

export interface ApiError {
  message: string;
  type: ErrorType;
  errors?: Record<string, string>;
}

export type ErrorType = "VALIDATION" | "GENERAL" | "SYSTEM";

export interface HandleApiErrorOptions<TFieldErrors> {
  error: ApiError;
  setFieldErrors?: (errors: TFieldErrors) => void;
  showToast: (message: string) => void;
}

export type LiveSearchResult<T> = {
  items: T[];
  error: string | null;
};

export type ApiResponse<T, E extends Error | GroupsErrorResponse> = {
  data?: T;
  error?: E;
};

export type Result<T, E> = { ok: true; data: T } | { ok: false; error: E };

export type NoContentResponse = {};

export interface PageDetails {
  size: number; // How many items per page
  number: number; // The page number
  totalElements: number;
  totalPages: number;
}

export interface Page<T> {
  content: T[];
  page: PageDetails;
}
