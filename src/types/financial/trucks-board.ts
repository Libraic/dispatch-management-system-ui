import type { Driver } from "../api/Driver.ts";
import type { User } from "../api/User.ts";

export type DriverWeeklyMileage = {
  driver: Driver | null;
  dispatcher: User | null;
};
