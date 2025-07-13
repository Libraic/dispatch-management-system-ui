export type CreateDriverRequest = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  truckNumber: string;
  trailerNumber: string;
  maxLegalWeightCapacity: string;
  trailerType: string;
  trailerLength: string;
  documentsStatus: string;
  position: string;
  state: string;
  city: string;
  companyUuid: string;
};

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
