import type { CreateDispatcherRequest } from "../types/api/dispatcher/dispatcher-api-request-types.ts";
import type { ApiResponse } from "../types/api/common/api-response-types.ts";
import type {
  Error,
  GroupsErrorResponse,
} from "../types/api/common/api-errors-types.ts";
import axios from "axios";
import { DISPATCHERS_BASE_URL } from "../constants/api/api-paths.ts";
import { handleApiErrors } from "../utils/api/api-common-error-utils.ts";

export const saveDispatcher = async (
  createDispatcherRequest: CreateDispatcherRequest,
): Promise<ApiResponse<null, Error | GroupsErrorResponse>> => {
  try {
    const response = await axios.post(
      DISPATCHERS_BASE_URL,
      createDispatcherRequest,
    );
    return response.data;
  } catch (error: any) {
    return handleApiErrors(error);
  }
};
