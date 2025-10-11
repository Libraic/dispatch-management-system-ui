export type TruckRegistrationData = {
  truckNumber: string;
  vinNumber: string;
  model: string;
  truckYear: number;
  truckMake: string;
  fuelType: string;
  color: string;
  weight: number;
};

export type TruckRegistrationError = {
  truckNumber: string;
  vinNumber: string;
  truckYear: string;
  weight: string;
};

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

export type CreateTruckRequest = {
  companyUuid: string;
  truckNumber: string;
  vinNumber: string;
  model: string;
  truckYear: number;
  truckMake: string;
  fuelType: string;
  color: string;
  weight: number;
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

export type TruckData = {
  uuid: string;
  truckNumber: string;
  createdAt: string;
};

export type TrailerData = {
  uuid: string;
  trailerNumber: string;
  createdAt: string;
};

export enum AssetTypeEnum {
  TRUCK = "TRUCK",
  TRAILER = "TRAILER",
}
