import type { LoadData } from "#/types/internal/planner/planner-types";
import { getZonedStartingPointAndWidthOfBlock } from "#/utils/planner/planner-utils";
import {
  getFirstPickUpLocation,
  getLastDeliveryLocation,
} from "#/features/planner/utils/loads.utils";
import { toZonedDateTime } from "#/shared/utils/timezone.utils";
import { getCurrentDay } from "#/utils/global/date-utils";

export function useLoadPosition(
  load: LoadData,
  days: string[],
  timezone: string,
) {
  const firstLocation = getFirstPickUpLocation(load.locations)!;
  const lastLocation = getLastDeliveryLocation(load.locations)!;
  const startZonedDateTime = toZonedDateTime(
    firstLocation.date ?? getCurrentDay(),
    firstLocation.timezone,
    firstLocation.time,
  ).withTimeZone(timezone);
  const endZonedDateTime = toZonedDateTime(
    lastLocation.date,
    lastLocation.timezone,
    lastLocation.time,
  ).withTimeZone(timezone);

  return getZonedStartingPointAndWidthOfBlock(
    startZonedDateTime.withTimeZone(timezone),
    endZonedDateTime.withTimeZone(timezone),
    days,
  );
}
