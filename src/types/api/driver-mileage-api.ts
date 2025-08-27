export type Mileage = {
  date: string;
  destinationNote: string | null;
  revenue: number | null;
  miles: number | null;
  note: string | null;
};

export type DriverMileage = {
  mileageUuid: string | null;
  dispatcherUuid: string;
  driverUuid: string;
  itemIdentifier: string;
  mileage: Mileage[];
};

export type UpsertDriversMileageRequest = {
  companyUuid: string;
  driverMileageData: DriverMileage[];
};
