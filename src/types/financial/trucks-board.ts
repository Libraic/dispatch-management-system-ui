import type { Driver } from "../api/Driver.ts";
import type { User } from "../api/User.ts";

export const DRIVER_KEY = "driver";
export const DISPATCHER_KEY = "dispatcher";

export type Mileage = {
  date: string;
  revenue: string | null;
  miles: string | null;
  destinationNote: string | null;
  note: string | null;
};

export type DriverWeeklyMileage = {
  uuid: string | null;
  driver: Driver | null;
  dispatcher: User | null;
  itemIdentifier: string;
  mileageData: Mileage[];
};

export type MileageError = {
  [field: string]: string;
};

export type DriverMileageError = {
  [identifier: string]: string | MileageError;
};

export type DriversMileageErrors = {
  [identifier: string]: DriverMileageError;
};
