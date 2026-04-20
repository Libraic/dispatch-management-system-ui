import type { DriverData } from "#/types/api/driver/driver-api-response-types";
import type { DispatcherData } from "#/types/api/dispatcher/dispatcher-api-response-types";
import type { LoadStatus } from "#/types/internal/planner/planner-types";
import type { GetVehicleMaintenanceResponse } from "#/types/api/vehicle-maintenance/vehicle-maintenance-api-response-types";
import type { GetDaysOffPeriodResponse } from "#/types/api/days-off/days-off-api-response-types";

export type ApiLoadLocation = {
  label?: string;
  date?: string;
  location?: string;
  order?: number;
  time?: string;
  address?: string;
};

export type UpsertLoadRequest = {
  loadUuid?: string;
  relationUuid?: string;
  revenue?: string;
  loadedMiles?: string;
  emptyMiles?: string;
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
  loadedMiles: number;
  emptyMiles: number;
  broker: string;
  representative: string;
  representativeContactNumber: string;
  loadStatus: LoadStatus;
  locations: ApiLoadLocation[];
};

export type GetLoadResponse = {
  loadUuid?: string;
  revenue?: number;
  loadedMiles?: number;
  emptyMiles?: number;
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
  address?: string;
}
