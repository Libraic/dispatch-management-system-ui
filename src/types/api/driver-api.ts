export type CreateDriverRequest = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  documentsStatus: string;
  position: string;
  state: string;
  city: string;
  companyUuid: string;
  truckUuid: string | null;
  trailerUuid: string | null;
};

export type DriverData = {
  uuid: string;
  firstName: string;
  lastName: string;
  truckNumber: string;
  trailerNumber: string;
  email: string;
  phoneNumber: string;
  documentsStatus: number;
  state: string;
  city: string;
};
