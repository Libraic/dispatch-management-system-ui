import type {
  ApiResponse,
  Error,
  GroupsErrorResponse,
} from "../types/api/common.ts";
import axios from "axios";
import { SAVE_DRIVER_MILEAGE } from "../utils/api/api-paths.ts";
import { handleApiErrors } from "../utils/registration/common-api-error-utils.ts";
import type { UpsertDriversMileageRequest } from "../types/api/driver-mileage-api.ts";
import type { DriverWeeklyMileage } from "../types/financial/trucks-board.ts";

export const saveDriversMileage = async (
  upsertDriversMileageRequest: UpsertDriversMileageRequest,
): Promise<ApiResponse<DriverWeeklyMileage[], Error | GroupsErrorResponse>> => {
  try {
    const response = await axios.put(
      SAVE_DRIVER_MILEAGE,
      upsertDriversMileageRequest,
    );
    return response.data;
  } catch (error: any) {
    return handleApiErrors(error);
  }
};
