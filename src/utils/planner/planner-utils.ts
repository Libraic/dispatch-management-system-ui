import type {
  DispatchingRelation,
  DriverWorkforce,
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
  startDate: Date,
  endDate: Date,
  days: string[],
) => {
  const startIndex = getDayIndex(startDate, days);
  const endIndex = getDayIndex(endDate, days);
  const clampedStart = Math.max(startIndex === -1 ? 0 : startIndex, 0);
  const clampedEnd = Math.min(endIndex === -1 ? 13 : endIndex, 13);
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
