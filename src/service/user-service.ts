import axios from "axios";
import { SAVE_USER } from "../utils/api/api-paths.ts";
import type {
  CreateUserRequest,
  UserData,
} from "../types/api/registration-api.ts";
import type {
  ApiResponse,
  Error,
  GroupsErrorResponse,
} from "../types/api/common.ts";
import { handleApiErrors } from "../utils/api/common-api-error-utils.ts";

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
