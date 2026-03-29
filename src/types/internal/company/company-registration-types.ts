import type { YearData } from "../time/date-types.ts";

export type CompanyRegistrationTypes = {
  name: string;
  mcNumber?: string;
  address?: string;
  email: string;
  password: string;
  confirmPassword: string;
  serviceDate: YearData;
  startDate: YearData;
};

export type CompanyRegistrationError = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type CreateCompanyRequest = {
  name: string;
  email: string;
  password: string;
  mcNumber: string | null;
  address: string | null;
  serviceDate: string | null;
  startDate: string;
};
