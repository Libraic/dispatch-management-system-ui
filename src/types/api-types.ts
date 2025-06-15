import type { Pagination } from "./global.ts";

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
};

export type ApiResponse<T> = {
  data: T;
  error: Error;
};

export type CompanyData = {
  name: string;
  uuid: string;
};

export type GetCompaniesResponse = {
  links: Link[];
  content: CompanyData[];
  page: PageInfo;
};

export type PaginatedData<T> = {
  data: T[];
  pagination: Pagination;
  error: Error | undefined;
};
