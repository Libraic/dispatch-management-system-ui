import type {
  DaysOffPeriodData,
  DispatchingRelation,
} from "../../types/internal/planner/planner-types.ts";
import { updateDriverField } from "./planner-utils.ts";
import { toNormalizedIsoDate } from "../global/date-utils.ts";
import type { GetDaysOffPeriodResponse } from "../../types/api/days-off/days-off-api-response-types.ts";

export const changeDaysOffPeriodData = (
  prevDispatchingRelations: DispatchingRelation[],
  dispatchingRelationId: string,
  driverId: string,
  newDaysOffPeriodDatum: DaysOffPeriodData,
) =>
  updateDriverField(
    prevDispatchingRelations,
    dispatchingRelationId,
    driverId,
    "daysOffPeriods",
    (periods) => [
      ...periods.filter((prev) => prev.id !== newDaysOffPeriodDatum.id),
      newDaysOffPeriodDatum,
    ],
  );

export const updateDaysOffPeriodsAfterDeletions = (
  prevDispatchingRelations: DispatchingRelation[],
  dispatchingRelationId: string,
  driverId: string,
  newDaysOffPeriodData: DaysOffPeriodData[],
) =>
  updateDriverField(
    prevDispatchingRelations,
    dispatchingRelationId,
    driverId,
    "daysOffPeriods",
    () => newDaysOffPeriodData,
  );

export const fromGetDaysOffPeriodResponseToDaysOffPeriodData = (
  getDaysOffPeriodResponse: GetDaysOffPeriodResponse,
): DaysOffPeriodData => {
  return {
    id: getDaysOffPeriodResponse.daysOffPeriodId,
    startDate: toNormalizedIsoDate(getDaysOffPeriodResponse.startDate),
    endDate: toNormalizedIsoDate(getDaysOffPeriodResponse.endDate),
  };
};
