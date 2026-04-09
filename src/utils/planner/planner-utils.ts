import type {
  DispatchingRelation,
  DriverWorkforce,
  Time,
} from "../../types/internal/planner/planner-types.ts";
import { HYPHEN } from "../../constants/common/global-constants.ts";
import {
  DEFAULT_LOCALE,
  WEEKDAYS,
} from "../../constants/date/date-constants.ts";
import { toIsoDate } from "../global/date-utils.ts";
import {
  DAY_CELL_WIDTH,
  METADATA_WIDTH,
} from "../../constants/planner/planner-constants.ts";
import { timeToHHmm } from "../../types/internal/time/time-types.ts";

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

const getBlockCoverage = (time: Time) => {
  const isoTime = timeToHHmm(time)!!;
  const [hours, minutes] = isoTime.split(":").map(Number);
  return (hours * 60 + minutes) / 1440.0;
};

export const getStartingPointAndWidthOfBlock = (
  startDate: Date,
  endDate: Date,
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
    startingPoint: leftRem,
    width: widthRem,
  };
};

const getDayIndex = (date: Date, days: string[]): number => {
  const target = toIsoDate(date);
  return days.findIndex((d) => d === target);
};
