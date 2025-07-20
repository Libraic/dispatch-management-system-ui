import type {
  ApiResponse,
  Error,
  GroupsErrorResponse,
} from "../types/api/common.ts";
import axios from "axios";
import { SAVE_DRIVER } from "../utils/api/api-paths.ts";
import type { CreateDriverRequest } from "../types/api/driver-api.ts";
import type { UserData } from "../types/api/registration-api.ts";
import { handleApiErrors } from "../utils/registration/common-api-error-utils.ts";

export const saveDriver = async (
  createDriverRequest: CreateDriverRequest,
): Promise<ApiResponse<UserData, Error | GroupsErrorResponse>> => {
  try {
    const response = await axios.post(SAVE_DRIVER, createDriverRequest);
    return response.data;
  } catch (error: any) {
    return handleApiErrors(error);
  }
};
