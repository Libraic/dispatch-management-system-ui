import type { LoadData } from "#/types/internal/planner/planner-types";
import { getStartingPointAndWidthOfBlock } from "#/utils/planner/planner-utils";
import {
  getFirstPickUpLocation,
  getLastDeliveryLocation,
} from "#/features/planner/utils/loads.utils";

export function useLoadPosition(load: LoadData, days: string[]) {
  const firstLocation = getFirstPickUpLocation(load.locations)!;
  const lastLocation = getLastDeliveryLocation(load.locations)!;

  return getStartingPointAndWidthOfBlock(
    firstLocation.date,
    lastLocation.date,
    days,
    firstLocation.time,
    lastLocation.time,
  );
}
