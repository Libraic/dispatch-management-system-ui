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
  dispatcherUuid: string | null;
};
