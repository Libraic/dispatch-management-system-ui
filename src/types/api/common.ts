import type { Pagination } from "../global.ts";

export type Link = {
  rel: string;
  href: string;
};

export type PageInfo = {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
};

export type Error = {
  message: string;
  field: string | null;
};

export type FieldErrorResponse = {
  field: string | null;
  errorMessage: string;
};

export type ItemErrorResponse = {
  itemIdentifier: string | null;
  groupItemFieldsErrors: FieldErrorResponse[];
};

export type GroupErrorResponse = {
  impactedGroup: string;
  errors: ItemErrorResponse[];
};

export type ApiResponse<T, E extends Error | GroupErrorResponse[]> = {
  data: T | null;
  error: E | null;
};

export type PaginatedData<T> = {
  data: T[];
  pagination: Pagination;
  error: Error | undefined;
};
