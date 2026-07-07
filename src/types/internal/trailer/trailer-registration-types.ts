export type TrailerRegistrationData = {
  trailerNumber?: string;
  vinNumber?: string;
  trailerYear?: string;
  trailerMake?: string;
  equipmentType?: string;
  equipmentSize?: string;
  palletCapacity?: string;
  maxWeight?: string;
  tireSize?: string;
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
