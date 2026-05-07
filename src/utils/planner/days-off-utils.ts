import type {
  DaysOffPeriodData,
  DispatchingRelation,
  DriverWorkforce,
} from "#/types/internal/planner/planner-types";
import { updateDriverField } from "./planner-utils";
import { getCurrentDay } from "#/utils/global/date-utils";
import type { GetDaysOffPeriodResponse } from "#/types/api/days-off/days-off-api-response-types";

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
    startDate: getDaysOffPeriodResponse.startDate,
    endDate: getDaysOffPeriodResponse.endDate,
  };
};

export const getInitialData = (
  workforce: DriverWorkforce,
  id?: string,
  day?: string,
): DaysOffPeriodData => {
  if (!id) {
    const date = day ?? getCurrentDay();
    return { id, startDate: date, endDate: date };
  }

  const dayOffPeriod = workforce.daysOffPeriods.filter(
    (daysOffPeriod) => daysOffPeriod.id === id,
  )[0];
  return {
    id: dayOffPeriod.id,
    startDate: dayOffPeriod.startDate,
    endDate: dayOffPeriod.endDate,
  };
};
