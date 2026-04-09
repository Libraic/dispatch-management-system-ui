import type { DriverData } from "../driver/driver-api-response-types.ts";
import type { DispatcherData } from "../dispatcher/dispatcher-api-response-types.ts";
import type { LoadStatus } from "../../internal/planner/planner-types.ts";
import type { GetVehicleMaintenanceResponse } from "../vehicle-maintenance/vehicle-maintenance-api-response-types.ts";
import type { GetDaysOffPeriodResponse } from "../days-off/days-off-api-response-types.ts";

export type ApiLoadLocation = {
  label?: string;
  date?: string;
  location?: string;
  order?: number;
  time?: string;
};

export type UpsertLoadRequest = {
  loadUuid?: string;
  relationUuid?: string;
  revenue?: number;
  miles?: number;
  broker?: string;
  pickUpLocation?: string;
  deliveryLocation?: string;
  pickUpDate?: string;
  deliveryDate?: string;
  representative?: string;
  representativeContactNumber?: string;
  loadStatus?: LoadStatus;
  locations?: ApiLoadLocation[];
};

export type UpsertLoadResponse = {
  loadUuid: string;
  startDate: string;
  endDate: string;
  revenue: number;
  miles: number;
  broker: string;
  representative: string;
  representativeContactNumber: string;
  loadStatus: LoadStatus;
  locations: ApiLoadLocation[];
};

export type GetLoadResponse = {
  loadUuid?: string;
  revenue?: number;
  miles?: number;
  broker?: string;
  representative?: string;
  representativeContactNumber?: string;
  loadStatus?: LoadStatus;
  startDate?: string;
  endDate?: string;
  locations?: ApiLoadLocation[];
};

export type WorkforceData = {
  relationUuid: string;
  driver: DriverData;
  loads: GetLoadResponse[];
  vehicleMaintenanceRecords: GetVehicleMaintenanceResponse[];
  daysOffPeriods: GetDaysOffPeriodResponse[];
};

export type GetDispatchingDataResponse = {
  dispatcher: DispatcherData;
  workforceData: WorkforceData[];
};

export interface GetLoadStartingPointResponse {
  location: string;
  time: string;
}
