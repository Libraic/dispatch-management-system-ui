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

export type TruckData = {
  uuid: string;
  truckNumber: string;
  createdAt: string;
};
