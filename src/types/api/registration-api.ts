import type { Link, PageInfo } from "./common.ts";

export interface CompanyData {
  uuid: string;
  name: string;
  mcNumber: string | null;
  address: string | null;
  startDate: string;
}

export type DriverData = {
  uuid: string;
  firstName: string;
  lastName: string;
  truckNumber: string;
  trailerNumber: string;
  email: string;
  phoneNumber: string;
  maxLegalWeightCapacity: number;
  documentsStatus: number;
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

export type EmergencyContact = {
  name: string | null;
  relationship: string | null;
  phone: string | null;
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
  emergencyContact: EmergencyContact | null;
  role: string;
  position: string;
  supervisor: CreateSupervisorRequest;
  workloads: CreateWorkloadRequest[];
  notes: string[];
};

export interface UserData {
  uuid: string;
  firstName: string;
  nickname: string | null;
  lastName: string;
}
