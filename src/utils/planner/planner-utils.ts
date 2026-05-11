import type {
  DispatchingRelation,
  DriverWorkforce,
  Time,
} from "#/types/internal/planner/planner-types";
import { HYPHEN } from "#/constants/common/global-constants";
import { DEFAULT_LOCALE, WEEKDAYS } from "#/constants/date/date-constants";
import {
  DAY_CELL_WIDTH,
  METADATA_WIDTH,
} from "#/constants/planner/planner-constants";
import { timeToHHmm } from "#/types/internal/time/time-types";
import { Temporal } from "@js-temporal/polyfill";

export const updateDriverField = <K extends keyof DriverWorkforce>(
  prevDispatchingRelations: DispatchingRelation[],
  dispatchingRelationId: string,
  driverId: string,
  field: K,
  updateFieldFn: (current: DriverWorkforce[K]) => DriverWorkforce[K],
): DispatchingRelation[] =>
  prevDispatchingRelations.map((dispatchingRelation) => {
    if (dispatchingRelation.id !== dispatchingRelationId) {
      return dispatchingRelation;
    }

    return {
      ...dispatchingRelation,
      workforceUnits: dispatchingRelation.workforceUnits.map(
        (workforceUnit) => {
          if (workforceUnit.driver.uuid !== driverId) {
            return workforceUnit;
          }

          return {
            ...workforceUnit,
            [field]: updateFieldFn(workforceUnit[field]),
          };
        },
      ),
    };
  });

export const getWeekWithDayAndMonth = (week: string[]) => {
  const biweeklyTimeline = [...week];
  for (const weekDay of week) {
    const [y, m, d] = weekDay.split(HYPHEN).map(Number);
    const date = new Date(y, m - 1, d);
    date.setDate(date.getDate() + 7);
    biweeklyTimeline.push(date.toLocaleDateString(DEFAULT_LOCALE));
  }

  return biweeklyTimeline.map((day, index) => {
    const dateParts = day.split(HYPHEN);
    return `${WEEKDAYS[index % 7].substring(0, 3)} ${dateParts[0]}${HYPHEN}${dateParts[1]}${HYPHEN}${dateParts[2]}`;
  });
};

export const getStartingPointAndWidthOfBlock = (
  startDate: string,
  endDate: string,
  days: string[],
  startTime?: Time,
  endTime?: Time,
) => {
  const startBlockCoverage = startTime ? getBlockCoverage(startTime) : 0;
  const endBlockCoverage = endTime ? 1 - getBlockCoverage(endTime) : 0;

  const startIndex = getDayIndex(startDate, days);
  const endIndex = getDayIndex(endDate, days);

  const clampedStart = Math.abs(
    Math.max(startIndex === -1 ? 0 : startIndex, 0) + startBlockCoverage,
  );

  const clampedEnd = Math.abs(
    Math.min(endIndex === -1 ? 13 : endIndex, 13) - endBlockCoverage,
  );

  const leftRem = METADATA_WIDTH + clampedStart * DAY_CELL_WIDTH;
  const widthRem = (clampedEnd - clampedStart + 1) * DAY_CELL_WIDTH;

  return {
    startingPoint: leftRem + 0.1,
    width: widthRem - 0.2,
  };
};

const getDayIndex = (date: string, days: string[]): number => {
  return days.findIndex((d) => d === date);
};

const getBlockCoverage = (time: Time) => {
  const isoTime = timeToHHmm(time)!!;
  const [hours, minutes] = isoTime.split(":").map(Number);
  return (hours * 60 + minutes) / 1440.0;
};

export const getZonedStartingPointAndWidthOfBlock = (
  startDate: Temporal.ZonedDateTime,
  endDate: Temporal.ZonedDateTime,
  days: string[],
) => {
  const startBlockCoverage = getZonedBlockCoverage(startDate);
  const endBlockCoverage = getZonedBlockCoverage(endDate);

  const startIndex = getZonedDayIndex(startDate, days);
  const endIndex = getZonedDayIndex(endDate, days);

  const clampedStart = Math.abs(
    Math.max(startIndex === -1 ? 0 : startIndex, 0) + startBlockCoverage,
  );

  const clampedEnd = Math.abs(
    Math.min(endIndex === -1 ? 13 : endIndex, 13) + endBlockCoverage,
  );

  const leftRem = METADATA_WIDTH + clampedStart * DAY_CELL_WIDTH;
  const widthRem = (clampedEnd - clampedStart) * DAY_CELL_WIDTH;

  return {
    startingPoint: leftRem + 0.1,
    width: widthRem - 0.2,
  };
};

const getZonedDayIndex = (
  zdt: Temporal.ZonedDateTime,
  days: string[],
): number => {
  const target = `${zdt.year.toString().padStart(4, "0")}-${zdt.month
    .toString()
    .padStart(2, "0")}-${zdt.day.toString().padStart(2, "0")}`;

  return days.findIndex((d) => d === target);
};

const getZonedBlockCoverage = (zdt: Temporal.ZonedDateTime) => {
  const minutes = zdt.hour * 60 + zdt.minute;
  return minutes / 1440;
};
