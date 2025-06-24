import type { YearData } from "../../global.ts";

export type CompanyRegistrationData = {
  name: string;
  mcNumber?: string;
  address?: string;
  serviceDate: YearData;
};

export type CompanyRegistrationError = {
  name: string;
};

export type CreateCompanyRequest = {
  name: string;
  mcNumber: string | null;
  address: string | null;
  serviceDate: string | null;
};
