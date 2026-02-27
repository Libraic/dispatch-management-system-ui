import axios from "axios";
import { SAVE_USER } from "../constants/api/api-paths.ts";
import { handleApiErrors } from "../utils/api/api-common-error-utils.ts";
import type { CreateUserRequest } from "../types/api/user/user-api-request-types.ts";
import type { ApiResponse } from "../types/api/common/api-response-types.ts";
import type {
  Error,
  GroupsErrorResponse,
} from "../types/api/common/api-errors-types.ts";
import type { UserData } from "../types/api/user/user-api-response-types.ts";

export const saveUser = async (
  createUserRequest: CreateUserRequest,
): Promise<ApiResponse<UserData, Error | GroupsErrorResponse>> => {
  try {
    const response = await axios.post(SAVE_USER, createUserRequest);
    return response.data;
  } catch (error: any) {
    return handleApiErrors(error);
  }
};
