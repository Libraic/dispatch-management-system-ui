import type { Driver } from "../classes/Driver.ts";
import type { Dispatcher } from "../classes/Dispatcher.ts";

export type LoadStatus = "Covered" | "Transit" | "Empty" | "Unknown";

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
  revenue?: string;
  miles?: string;
  // TODO: Consider removing this in favor of pickUpDate
  date: string;
  broker: string;
  loadStatus: LoadStatus;
  locations: LoadLocationData[];
  idAcrossTimeframe?: string;
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
  identifier: string | null;
  driver: Driver | null;
  totalRevenue: number;
  totalMiles: number;
  loads: Map<string, LoadData>;
};

export type DispatcherLoadData = {
  identifier: string;
  dispatcher: Dispatcher | null;
  startDate: string;
  endDate: string;
  totalRevenue: number;
  totalMiles: number;
  driverLoads: DriverLoadData[];
};

export const LoadStatusColor: Record<LoadStatus, string> = {
  Covered: "bg-[#5dbb63]",
  Transit: "bg-[#b2d3c2]",
  Empty: "bg-[#bd2734]",
  Unknown: "bg-pale-blue",
};
