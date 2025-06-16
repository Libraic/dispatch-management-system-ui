import axios from "axios";
import { SAVE_USER } from "../utils/api-paths.ts";
import type {
  CreateUserRequest,
  UserData,
} from "../types/api/registration-api.ts";
import type { ApiResponse } from "../types/api/common.ts";

export const saveUser = async (
  createUserRequest: CreateUserRequest,
): Promise<ApiResponse<UserData>> => {
  try {
    const response = await axios.post(SAVE_USER, createUserRequest);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};
