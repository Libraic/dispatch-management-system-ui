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
