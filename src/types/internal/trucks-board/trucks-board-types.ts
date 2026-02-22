import type { Driver } from "../classes/Driver.ts";
import type { Dispatcher } from "../classes/Dispatcher.ts";

export type LoadStatus = "Covered" | "Transit" | "Empty" | "Unknown";

export type MileageData = {
  revenue?: string;
  miles?: string;
  // TODO: Consider removing this in favor of pickUpDate
  date: string;
  broker: string;
  pickUpLocation?: string;
  pickUpDate: Date;
  deliveryLocation?: string;
  deliveryDate: Date;
  loadStatus: LoadStatus;
  representative?: string;
};

export type MileageDataError = {
  revenueError: string;
  milesError: string;
  brokerError: string;
  pickUpLocationError: string;
  deliveryLocationError: string;
};

export type DriverMileageData = {
  identifier: string | null;
  driver: Driver | null;
  totalRevenue: number;
  totalMiles: number;
  mileage: Map<string, MileageData>;
};

export type DispatcherMileageData = {
  identifier: string;
  dispatcher: Dispatcher | null;
  startDate: string;
  endDate: string;
  totalRevenue: number;
  totalMiles: number;
  driverMileageDataList: DriverMileageData[];
};

export const LoadStatusColor: Record<LoadStatus, string> = {
  Covered: "bg-[#5dbb63]",
  Transit: "bg-[#b2d3c2]",
  Empty: "bg-[#bd2734]",
  Unknown: "bg-pale-blue",
};
