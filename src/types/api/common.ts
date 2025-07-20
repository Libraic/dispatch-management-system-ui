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
  field?: string;
  identifier?: string;
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

export type GroupsErrorResponse = {
  errors: Error | Error[];
};

export type ApiResponse<T, E extends Error | GroupsErrorResponse> = {
  data?: T;
  error?: E;
};

export type PaginatedData<T> = {
  data: T[];
  pagination: Pagination;
  error: Error | undefined;
};
