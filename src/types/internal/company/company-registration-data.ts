export type CompanyRegistrationData = {
  name: string;
  mcNumber?: string;
  address?: string;
  email: string;
  password: string;
  confirmPassword: string;
  serviceDate: string;
  startDate: string;
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
  timezone: string;
};
