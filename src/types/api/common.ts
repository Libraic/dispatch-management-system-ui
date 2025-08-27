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

export type SearchCriteria = {
  field: string;
  operation: string;
};

export type LiveSearchResult<T> = {
  items: T[];
  error: string | null;
};
