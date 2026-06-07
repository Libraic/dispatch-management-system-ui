import type { ApiError, Result } from "#/shared/types/api.types";
import { getApiError } from "#/shared/api/utils/api.utils";
import type { LoginData } from "#/features/authentication/components/Login/Login.types";
import type {
  AuthenticationRequest,
  AuthenticationResponse,
} from "#/features/authentication/api/api.types";
import { BASE_URL } from "#/shared/api/constants/apiPaths.constants";
import api from "#/shared/api/client/apiClient";

const AUTHENTICATION_URL = BASE_URL + "/auth/authenticate";

export const authenticate = async (
  loginData: LoginData,
): Promise<Result<AuthenticationResponse, ApiError>> => {
  const request: AuthenticationRequest = {
    email: loginData.username,
    password: loginData.password,
  };
  try {
    const response = await api.post(AUTHENTICATION_URL, request);
    return {
      ok: true,
      data: response.data,
    };
  } catch (error) {
    return getApiError(error);
  }
};
