import type {
  ApiError,
  NoContentResponse,
  Result,
} from "#/shared/types/api.types";
import axios from "axios";
import { getApiError } from "#/shared/api/utils/api.utils";
import type { LoginData } from "#/features/authentication/components/Login.types";
import type { AuthenticateUserRequest } from "#/features/authentication/components/api.types";
import { BASE_URL } from "#/shared/api/constants/apiPaths.constants";

const AUTHENTICATION_URL = BASE_URL + "/auth/authenticate";

export const authenticateUser = async (
  loginData: LoginData,
): Promise<Result<NoContentResponse, ApiError>> => {
  const request: AuthenticateUserRequest = {
    username: loginData.username,
    password: loginData.password,
  };
  try {
    const response = await axios.post(AUTHENTICATION_URL, request);
    return {
      ok: true,
      data: response.data,
    };
  } catch (error) {
    return getApiError(error);
  }
};
