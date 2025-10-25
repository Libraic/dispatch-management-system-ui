export type TrailerRegistrationData = {
  trailerNumber: string;
  vinNumber: string;
  trailerYear: number;
  trailerMake: string;
  equipmentType: string;
  equipmentSize: number;
  palletCapacity: number;
  maxWeight: number;
  tireSize: string;
};

export type TrailerRegistrationError = {
  trailerNumber: string;
  vinNumber: string;
  trailerYear: string;
  equipmentSize: string;
  equipmentType: string;
  palletCapacity: string;
  maxWeight: string;
};

export type CreateTrailerRequest = {
  companyUuid: string;
  trailerNumber: string;
  vinNumber: string;
  trailerYear: number;
  trailerMake: string;
  equipmentType: string;
  equipmentSize: number;
  palletCapacity: number;
  maxWeight: number;
  tireSize: string;
};

export type TrailerData = {
  uuid: string;
  trailerNumber: string;
  createdAt: string;
};
