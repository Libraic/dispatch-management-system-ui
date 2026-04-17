import type { VehicleMaintenanceErrors } from "#/types/internal/planner/planner-types";
import { BLANK_STRING } from "#/constants/common/global-constants";

export const getBlankVehicleMaintenanceErrors =
  (): VehicleMaintenanceErrors => {
    return {
      locationError: BLANK_STRING,
    };
  };
