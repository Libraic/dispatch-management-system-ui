import axios from "axios";
import { SAVE_USER } from "../utils/api-paths.ts";
import type {
  CreateUserRequest,
  UserData,
} from "../types/api/registration-api.ts";
import type { ApiResponse, GroupErrorResponse } from "../types/api/common.ts";

export const saveUser = async (
  createUserRequest: CreateUserRequest,
): Promise<ApiResponse<UserData, GroupErrorResponse[]> | undefined> => {
  try {
    const response = await axios.post(SAVE_USER, createUserRequest);
    return response.data;
  } catch (error: any) {
    if (error.code === "ERR_NETWORK") {
      return Promise.resolve(undefined);
    }

    return error.response.data;
  }
};
