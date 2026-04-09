import type { DispatcherData } from "../../api/dispatcher/dispatcher-api-response-types.ts";
import type { DriverData } from "../../api/driver/driver-api-response-types.ts";

export type LoadStatus =
  | "Booked"
  | "Dispatched"
  | "Transit"
  | "Delivered"
  | "Docs Sent"
  | "Invoiced"
  | "Paid";

export type LocationLabel =
  | "Pick Up"
  | "Delivery"
  | "Starting Point"
  | "Ending Point";

export type ErrorType = "ApiError" | "InternalError" | "NoError";

export interface PlannerError {
  type: ErrorType;
  message?: string;
}

export type Period = "AM" | "PM";

export interface Time {
  hour: string;
  minute: string;
  period: Period;
}

export interface LoadLocationData {
  uuid: string;
  label: LocationLabel;
  date: Date;
  location: string;
  order: number;
  time?: Time;
}

export interface WorkforceActionData {
  id?: string;
  startDate: Date;
  endDate: Date;
}

export interface LoadData extends WorkforceActionData {
  revenue: string;
  miles: string;
  broker: string;
  loadStatus: LoadStatus;
  locations: LoadLocationData[];
  representative?: string;
  representativeContactNumber?: string;
}

export interface VehicleMaintenanceData extends WorkforceActionData {
  location: string;
}

export interface DaysOffPeriodData extends WorkforceActionData {}

export interface LoadLocationError {
  locationError?: string;
  dateError?: string;
}

export type LoadDataError = {
  revenueError?: string;
  milesError?: string;
  brokerError?: string;
  pickUpLocationError?: string;
  deliveryLocationError?: string;
  representativeContactNumberError?: string;
  locationsErrors?: Map<string, LoadLocationError>;
  ingestionError?: string;
};

export type VehicleMaintenanceErrors = {
  locationError?: string;
};

export type DriverWorkforce = {
  relationId: string;
  driver: DriverData;
  totalRevenue: number;
  totalMiles: number;
  loads: LoadData[];
  vehicleMaintenanceRecords: VehicleMaintenanceData[];
  daysOffPeriods: DaysOffPeriodData[];
};

export type DispatchingRelation = {
  id: string;
  dispatcher: DispatcherData;
  startDate: Date;
  endDate: Date;
  totalRevenue: number;
  totalMiles: number;
  workforceUnits: DriverWorkforce[];
};

export interface CalendarBookFormHandler {
  submit: () => Promise<PlannerError>;
}

export interface FormProps {
  workforce: DriverWorkforce;
  calendarBookModalType?: CalendarBookModalType;
  day?: string;
  id?: string;
}

export const CalendarBookModalTypes = ["Load", "Shop", "Days-off"] as const;
export type CalendarBookModalType = (typeof CalendarBookModalTypes)[number];
export type CalendarBookModalMetadata = {
  name: string;
  description: string;
};
export const LOAD_FORM_METADATA: Record<
  CalendarBookModalType,
  CalendarBookModalMetadata
> = {
  Load: {
    name: "Load Form",
    description: "Complete the required data for the Load",
  },
  Shop: {
    name: "Shop Form",
    description: "Complete the details of the Shop day",
  },
  "Days-off": {
    name: "Days Off Form",
    description: "Complete the details of your Day Off",
  },
};
