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
