import type { VehicleMaintenanceErrors } from "../../types/internal/planner/planner-types.ts";
import { BLANK_STRING } from "../../constants/common/global-constants.ts";

export const getBlankVehicleMaintenanceErrors =
  (): VehicleMaintenanceErrors => {
    return {
      locationError: BLANK_STRING,
    };
  };
