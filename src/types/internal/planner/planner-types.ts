import type { DispatcherData } from "#/types/api/dispatcher/dispatcher-api-response-types";
import type { DriverData } from "#/types/api/driver/driver-api-response-types";

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

export type Period = "AM" | "PM";

export interface Time {
  hour: string;
  minute: string;
  period: Period;
}

export interface LoadLocationData {
  uuid: string;
  label: LocationLabel;
  date: string;
  location: string;
  order: number;
  timezone: string;
  address?: string;
  time?: Time;
}

export interface WorkforceActionData {
  id?: string;
  startDate: string;
  endDate: string;
}

export interface LoadData extends WorkforceActionData {
  loadNumber: string;
  revenue: string;
  loadedMiles: string;
  emptyMiles?: string;
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
  loadNumberError?: string;
  revenueError?: string;
  loadedMilesError?: string;
  emptyMilesError?: string;
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
  totalLoadedMiles: number;
  loads: LoadData[];
  vehicleMaintenanceRecords: VehicleMaintenanceData[];
  daysOffPeriods: DaysOffPeriodData[];
};

export type DispatchingRelation = {
  id: string;
  dispatcher: DispatcherData;
  startDate: string;
  endDate: string;
  totalRevenue: number;
  totalLoadedMiles: number;
  workforceUnits: DriverWorkforce[];
};

export type SubmitSuccess = "close-modal" | "stay-open";

export interface CalendarBookFormHandler {
  submit: () => Promise<SubmitSuccess>;
}

export interface SchedulableFormProps {
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
