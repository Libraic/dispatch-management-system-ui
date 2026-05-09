export const DRIVER_REGISTRATION_SECTIONS = {
  GENERAL_DETAILS: "General Details",
  ASSIGNMENTS: "Assignments",
  EMPLOYMENT_DATA: "Employment Data",
};

export interface TruckAssignmentData {
  truckUuid: string;
  truckNumber: string;
}

export interface TrailerAssignmentData {
  trailerUuid: string;
  trailerNumber: string;
}

export interface DispatcherAssignmentData {
  uuid: string;
  name: string;
}

export interface DriverRegistrationData {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  documentsStatus?: string;
  position?: string;
  location?: string;
  truckAssignmentData?: TruckAssignmentData;
  trailerAssignmentData?: TrailerAssignmentData;
  dispatcherAssignmentData?: DispatcherAssignmentData;
}

export interface DriverRegistrationError {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  truckNumber?: string;
  trailerNumber?: string;
  dispatcher?: string;
}
