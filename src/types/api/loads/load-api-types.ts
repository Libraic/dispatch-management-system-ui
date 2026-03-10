import type { DriverData } from "../driver/driver-api-response-types.ts";
import type { DispatcherData } from "../dispatcher/dispatcher-api-response-types.ts";
import type { LoadStatus } from "../../internal/trucks-board/trucks-board-types.ts";

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
  startDate?: string;
  endDate?: string;
  loadDate?: string;
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
  loads: LoadResponse[];
};

export type LoadResponse = {
  date: string;
  revenue?: number;
  miles?: number;
  broker: string;
  representative: string;
  representativeContactNumber: string;
  loadStatus: LoadStatus;
  idAcrossTimeframe: string;
  locations: ApiLoadLocation[];
};

export type DriverLoadData = {
  loadUuid: string | null;
  driver: DriverData;
  loads: LoadResponse[];
};

export type GetDriverLoadsResponse = {
  dispatcher: DispatcherData;
  driverLoads: DriverLoadData[];
};
