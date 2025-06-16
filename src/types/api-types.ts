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
  field: string | null;
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

export type CreateWorkloadRequest = {
  companyUuid: string;
  commission: number;
};

export type CreateUserRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  personalEmail: string | null;
  birthDate: string;
  employmentDate: string;
  role: string;
  position: string;
  supervisorUuid: string | null;
  workloads: CreateWorkloadRequest[];
  notes: string[];
};

export type UserData = {
  uuid: string;
};
