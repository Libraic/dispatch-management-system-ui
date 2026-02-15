import type { Driver } from "../classes/Driver.ts";
import type { Dispatcher } from "../classes/Dispatcher.ts";

export type MileageData = {
  revenue: string;
  miles: string;
  date: string;
  broker?: string;
};

export type MileageDataError = {
  revenueError: string;
  milesError: string;
  brokerError: string;
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
