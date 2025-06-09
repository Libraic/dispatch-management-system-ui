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

export type InternalCompanyInfo = {
  id: string;
  name: string;
  uuid: string;
};