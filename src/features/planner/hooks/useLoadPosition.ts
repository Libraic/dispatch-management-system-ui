import type { LoadData } from "#/types/internal/planner/planner-types";
import { getZonedStartingPointAndWidthOfBlock } from "#/utils/planner/planner-utils";
import {
  getFirstPickUpLocation,
  getLastDeliveryLocation,
} from "#/features/planner/utils/loads.utils";
import { toZonedDateTime } from "#/shared/utils/timezone.utils";

export function useLoadPosition(
  load: LoadData,
  days: string[],
  timezone: string,
) {
  const firstLocation = getFirstPickUpLocation(load.locations)!;
  const lastLocation = getLastDeliveryLocation(load.locations)!;

  const weekStart = days[0];
  const weekEnd = days[days.length - 1];

  const startsBeforeWeek = firstLocation.date < weekStart;
  const endsAfterWeek = lastLocation.date > weekEnd;

  const actualStart = toZonedDateTime(
    firstLocation.date,
    firstLocation.timezone,
    firstLocation.time,
  ).withTimeZone(timezone);

  const actualEnd = toZonedDateTime(
    lastLocation.date,
    lastLocation.timezone,
    lastLocation.time,
  ).withTimeZone(timezone);

  const clippedStart = startsBeforeWeek
    ? actualStart.startOfDay()
    : actualStart;

  const clippedEnd = endsAfterWeek
    ? actualEnd.startOfDay().add({ days: 1 }).subtract({ milliseconds: 1 })
    : actualEnd;

  return getZonedStartingPointAndWidthOfBlock(clippedStart, clippedEnd, days);
}
