export const DriverRegistrationSectionEnum = {
  GENERAL_DETAILS: "General Details",
  TRUCK_DETAILS: "Truck Details",
  EMPLOYMENT_DATA: "Employment Data",
} as const;

export type DriverRegistrationSectionEnum =
  keyof typeof DriverRegistrationSectionEnum;

export type DriverRegistrationData = {
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
};

export type DriverRegistrationError = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  truckNumber: string;
  trailerNumber: string;
  maxLegalWeightCapacity: string;
};
