import type { DriverData } from "../driver/driver-api-response-types.ts";
import type { DispatcherData } from "../dispatcher/dispatcher-api-response-types.ts";
import type { LoadStatus } from "../../internal/trucks-board/trucks-board-types.ts";

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
  pickUpLocation?: string;
  deliveryLocation?: string;
  pickUpDate?: string;
  deliveryDate?: string;
  representative?: string;
};

export type UpsertDriverMileageResponse = {
  driverMileageUuid: string;
  mileage: MileageResponse[];
};

export type MileageResponse = {
  date: string;
  revenue?: number;
  miles?: number;
  broker: string;
  representative: string;
  pickUpLocation: string;
  pickUpDate: Date;
  deliveryLocation: string;
  deliveryDate: Date;
  loadStatus: LoadStatus;
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
