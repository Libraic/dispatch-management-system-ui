import type {
  ApiResponse,
  Error,
  GroupErrorResponse,
} from "../types/api/common.ts";
import axios from "axios";
import { SAVE_DRIVER } from "../utils/api/api-paths.ts";
import type {
  CreateDriverRequest,
  DriverData,
} from "../types/api/driver-api.ts";
import { handleApiErrors } from "../utils/api/api-errors-handler.ts";

export const saveDriver = async (
  createDriverRequest: CreateDriverRequest,
): Promise<ApiResponse<DriverData, GroupErrorResponse[] | Error>> => {
  try {
    const response = await axios.post(SAVE_DRIVER, createDriverRequest);
    return response.data;
  } catch (error) {
    return handleApiErrors(error);
  }
};
