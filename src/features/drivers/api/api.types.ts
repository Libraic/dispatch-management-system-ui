export type CreateDriverRequest = {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  documentsStatus?: string;
  position?: string;
  location?: string;
  companyUuid?: string;
  truckUuid?: string;
  trailerUuid?: string;
  dispatcherUuid?: string;
};

export type DriverData = {
  uuid: string;
  firstName: string;
  lastName: string;
  fullName: string;
  truckNumber: string;
  trailerNumber: string;
  phoneNumber: string;
  state: string;
  city: string;
};
