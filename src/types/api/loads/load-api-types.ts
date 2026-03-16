import type { DriverData } from "../driver/driver-api-response-types.ts";
import type { DispatcherData } from "../dispatcher/dispatcher-api-response-types.ts";
import type { LoadStatus } from "../../internal/planner/planner-types.ts";

export type ApiLoadLocation = {
  label: string;
  date: string;
  location: string;
  order: number;
};

export type UpsertLoadRequest = {
  companyUuid: string;
  loadUuid?: string;
  dispatcherUuid?: string;
  driverUuid?: string;
  revenue?: number;
  miles?: number;
  broker?: string;
  pickUpLocation?: string;
  deliveryLocation?: string;
  pickUpDate?: string;
  deliveryDate?: string;
  representative?: string;
  representativeContactNumber?: string;
  locations?: ApiLoadLocation[];
};

export type UpsertLoadResponse = {
  loadUuid: string;
  startDate: Date;
  endDate: Date;
  revenue: number;
  miles: number;
  broker: string;
  representative: string;
  representativeContactNumber: string;
  loadStatus: LoadStatus;
  locations: ApiLoadLocation[];
};

export type LoadResponse = {
  loadUuid: string;
  revenue: number;
  miles: number;
  broker: string;
  representative?: string;
  representativeContactNumber?: string;
  loadStatus: LoadStatus;
  startDate: Date;
  endDate: Date;
  locations: ApiLoadLocation[];
};

export type DriverLoadData = {
  relationUuid: string;
  driver: DriverData;
  loads: LoadResponse[];
};

export type GetDriverLoadsResponse = {
  dispatcher: DispatcherData;
  driverLoads: DriverLoadData[];
};

export interface GetLoadStartingPointResponse {
  location: string;
}
