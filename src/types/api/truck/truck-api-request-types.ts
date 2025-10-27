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
