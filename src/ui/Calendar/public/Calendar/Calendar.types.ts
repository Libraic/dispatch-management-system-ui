import { type RefObject } from "react";
import type { Activator } from "#/hooks/useActivator";
import type { DayOfMonth } from "#/types/internal/time/date-types";

export type CalendarUnitType =
  (typeof CalendarUnitTypes)[keyof typeof CalendarUnitTypes];

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

export type CalendarProps = {
  unitType: CalendarUnitType;
  parentRef: RefObject<HTMLDivElement | null>;
  calendarActivator: Activator;
  timePeriodExtractor: (date: Date[]) => void;
};
