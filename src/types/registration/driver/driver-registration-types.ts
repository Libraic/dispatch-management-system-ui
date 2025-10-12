export const DRIVER_REGISTRATION_SECTIONS = {
  GENERAL_DETAILS: "General Details",
  TRUCK_DETAILS: "Assets Assignment",
  EMPLOYMENT_DATA: "Employment Data",
} as const;

export type TruckAssignmentData = {
  truckUuid: string;
  truckNumber: string;
};

export type TrailerAssignmentData = {
  trailerUuid: string;
  trailerNumber: string;
};

export type DriverRegistrationData = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  documentsStatus: string;
  position: string;
  state: string;
  city: string;
  truckAssignmentData: TruckAssignmentData;
  trailerAssignmentData: TrailerAssignmentData;
};

export type DriverRegistrationError = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  truckNumber: string;
  trailerNumber: string;
};
