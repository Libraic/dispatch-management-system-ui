import type { DriverData } from "../driver/driver-api-response-types.ts";
import type { DispatcherData } from "../dispatcher/dispatcher-api-response-types.ts";

export type UpsertDriverMileageRequest = {
  companyUuid: string;
  driverMileageUuid?: string;
  dispatcherUuid?: string;
  driverUuid?: string;
  startDate?: string;
  endDate?: string;
  mileageDate?: string;
  revenue?: number;
  miles?: number;
  broker?: string;
};

export type UpsertDriverMileageResponse = {
  driverMileageUuid: string;
};

export type MileageResponse = {
  date: string;
  revenue: number;
  miles: number;
  broker: string | null;
};

export type DriverMileageData = {
  driverMileageUuid: string | null;
  driver: DriverData;
  mileage: MileageResponse[];
};

export type GetDriverMileageResponse = {
  dispatcher: DispatcherData;
  driverMileageDataList: DriverMileageData[];
};
