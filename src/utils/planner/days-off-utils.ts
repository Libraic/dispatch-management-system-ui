import type {
  DaysOffPeriodData,
  DispatcherPlanningData,
} from "../../types/internal/planner/planner-types.ts";
import { updateDriverField } from "./planner-utils.ts";
import { toNormalizedIsoDate } from "../global/date-utils.ts";
import type { GetDaysOffPeriodResponse } from "../../types/api/days-off/days-off-api-response-types.ts";

export const changeDaysOffPeriodData = (
  prevDispatcherPlanningData: DispatcherPlanningData[],
  dispatcherPlanningDatumId: string,
  driverId: string,
  newDaysOffPeriodDatum: DaysOffPeriodData,
) =>
  updateDriverField(
    prevDispatcherPlanningData,
    dispatcherPlanningDatumId,
    driverId,
    "daysOffPeriods",
    (periods) => [
      ...periods.filter((prev) => prev.id !== newDaysOffPeriodDatum.id),
      newDaysOffPeriodDatum,
    ],
  );

export const updateDaysOffPeriodsAfterDeletions = (
  prevDispatcherPlanningData: DispatcherPlanningData[],
  dispatcherPlanningDatumId: string,
  driverId: string,
  newDaysOffPeriodData: DaysOffPeriodData[],
) =>
  updateDriverField(
    prevDispatcherPlanningData,
    dispatcherPlanningDatumId,
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
