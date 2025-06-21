import type { Link, PageInfo } from "./common.ts";

export type CompanyData = {
  name: string;
  uuid: string;
};

export type GetCompaniesResponse = {
  links: Link[];
  content: CompanyData[];
  page: PageInfo;
};

export type CreateSupervisorRequest = {
  uuid: string | null;
  fullName: string | null;
};

export type CreateWorkloadRequest = {
  companyUuid: string;
  companyName: string;
  itemIdentifier: string;
  commission: number;
};

export type CreateUserRequest = {
  firstName: string;
  lastName: string;
  nickname: string | null;
  email: string;
  password: string;
  personalEmail: string | null;
  birthDate: string;
  employmentDate: string;
  role: string;
  position: string;
  supervisor: CreateSupervisorRequest;
  workloads: CreateWorkloadRequest[];
  notes: string[];
};

export type UserData = {
  uuid: string;
  firstName: string;
  nickname: string | null;
  lastName: string;
};
