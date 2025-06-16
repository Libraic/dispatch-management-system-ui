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

export type ApiResponse<T> = {
  data: T;
  error: Error;
};

export type PaginatedData<T> = {
  data: T[];
  pagination: Pagination;
  error: Error | undefined;
};
