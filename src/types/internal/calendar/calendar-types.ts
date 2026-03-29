import type { DayOfMonth } from "../time/date-types.ts";

export type CalendarTimeline = {
  year: string;
  month: string;
  activeWeek: number;
};

export type WeekIndexer = Record<number, DayOfMonth[]>;

export const CalendarUnitTypes = {
  DAY: "DAY",
  WEEK: "WEEK",
} as const;

export type CalendarUnitType =
  (typeof CalendarUnitTypes)[keyof typeof CalendarUnitTypes];
