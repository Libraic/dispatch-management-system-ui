import type { Driver } from "../api/Driver.ts";
import type { DriverData } from "../api/driver-api.ts";
import type { UserData } from "../api/registration-api.ts";

export const DRIVER_KEY = "driver";
export const DISPATCHER_KEY = "dispatcher";

export type Mileage = {
  date: string;
  revenue: string | null;
  miles: string | null;
  destinationNote: string | null;
  note: string | null;
};

export type MileageData = {
  date: string;
  revenue: number | null;
  miles: number | null;
  destinationNote: string | null;
  note: string | null;
};

export type DriverWeeklyMileage = {
  uuid: string | null;
  driver: Driver | null;
  itemIdentifier: string;
  mileageData: Mileage[];
};

export type DriverWeeklyMileageResponse = {
  uuid: string;
  itemIdentifier: string | null;
  driver: DriverData;
  dispatcher: UserData;
  mileageData: MileageData[];
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
