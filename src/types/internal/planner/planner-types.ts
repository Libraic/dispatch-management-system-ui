import type { DispatcherData } from "../../api/dispatcher/dispatcher-api-response-types.ts";
import type { DriverData } from "../../api/driver/driver-api-response-types.ts";

export type LoadStatus = "Dispatched" | "Delivered";

export type LocationLabel =
  | "Pick Up"
  | "Delivery"
  | "Starting Point"
  | "Ending Point";

export type LocationLabelResource = Record<
  LocationLabel,
  { focused: string; unfocused: string }
>;

export interface LoadLocationData {
  uuid: string;
  label: LocationLabel;
  date: Date;
  location: string;
  order: number;
}

export type LoadData = {
  id?: string;
  revenue: string;
  miles: string;
  startDate: Date;
  endDate: Date;
  broker: string;
  loadStatus: LoadStatus;
  locations: LoadLocationData[];
  representative?: string;
  representativeContactNumber?: string;
};

export interface LoadLocationError {
  locationError: string;
  dateError: string;
}

export type LoadDataError = {
  revenueError: string;
  milesError: string;
  brokerError: string;
  pickUpLocationError: string;
  deliveryLocationError: string;
  representativeContactNumberError: string;
  locationsErrors: Map<string, LoadLocationError>;
};

export type DriverLoadData = {
  relationId: string;
  driver: DriverData;
  totalRevenue: number;
  totalMiles: number;
  loads: LoadData[];
};

export type DispatcherLoadData = {
  identifier: string;
  dispatcher: DispatcherData;
  startDate: Date;
  endDate: Date;
  totalRevenue: number;
  totalMiles: number;
  driverLoads: DriverLoadData[];
};

export const LoadBlockColor: Record<LoadStatus, string> = {
  Dispatched: "bg-[#6495ed]/50",
  Delivered: "bg-[#b2d3c2]/50",
};

export const LoadStatusColor: Record<LoadStatus, string> = {
  Dispatched: "text-[#0041c2]",
  Delivered: "text-[#234f1e]",
};
