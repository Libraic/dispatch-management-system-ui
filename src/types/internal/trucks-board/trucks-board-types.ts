import type { Driver } from "../classes/Driver.ts";
import type { UserData } from "../../api/user/user-api-response-types.ts";
import type { User } from "../classes/User.ts";
import type { DriverData } from "../../api/driver/driver-api-response-types.ts";

export const DRIVER_KEY = "driver";
export const DISPATCHER_KEY = "dispatcher";

export type Mileage = {
  date: string;
  revenue: string | null;
  miles: string | null;
  destinationNote: string | null;
  note: string | null;
  broker: string | null;
};

export type MileageData = {
  date: string;
  revenue: number | null;
  miles: number | null;
  destinationNote: string | null;
  note: string | null;
  broker: string | null;
};

export type DriverWeeklyMileage = {
  uuid: string | null;
  driver: Driver | null;
  itemIdentifier: string;
  mileageData: Mileage[];
};

export type DriversMileageGroup = {
  dispatcher: User | null;
  groupIdentifier: string;
  startDate: string;
  endDate: string;
  items: DriverWeeklyMileage[];
};

export type DriverWeeklyMileageResponse = {
  uuid: string;
  itemIdentifier: string | null;
  driver: DriverData;
  dispatcher: UserData;
  mileageData: MileageData[];
  startDate: string;
  endDate: string;
};

export type MileageError = {
  [field: string]: string;
};

export type DriverMileageErrors = {
  [identifier: string]: string | MileageError;
};

export type DriversMileageGroupErrors = {
  [identifier: string]: string | DriverMileageErrors;
};

export type DriversMileageGroupsErrors = {
  [identifier: string]: DriversMileageGroupErrors;
};
