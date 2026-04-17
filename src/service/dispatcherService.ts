import type { CreateDispatcherRequest } from "#/types/api/dispatcher/dispatcher-api-request-types";
import type {
  Error,
  GroupsErrorResponse,
} from "#/types/api/common/api-errors-types";
import axios from "axios";
import { DISPATCHERS_BASE_URL } from "#/shared/api/constants/apiPaths.constants";
import { handleApiErrors } from "#/utils/api/api-common-error-utils";
import type { ApiResponse } from "#/shared/types/api.types";

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
