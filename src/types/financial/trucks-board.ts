import type { Driver } from "../api/Driver.ts";
import type { User } from "../api/User.ts";

export type Mileage = {
  day: string;
  revenue: string;
  miles: string;
  destinationNote: string;
  note?: string;
};

export type DriverWeeklyMileage = {
  driver: Driver | null;
  dispatcher: User | null;
  mileages: Mileage[];
};
