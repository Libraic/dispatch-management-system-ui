import type { DispatcherRegistrationData } from "#/types/internal/dispatcher/dispatcher-registration-types";
import type { ApiError, Result } from "#/shared/types/api.types";
import type { UpsertLoadResponse } from "#/types/api/loads/load-api-types";
import type { CreateDispatcherRequest } from "#/types/api/dispatcher/dispatcher-api-request-types";
import { cleanPhoneNumber } from "#/shared/utils/inputField.formatter";
import axios from "axios";
import { DISPATCHERS_BASE_URL } from "#/shared/api/constants/apiPaths.constants";
import { getApiError } from "#/shared/api/utils/api.utils";

export const saveDispatcher = async (
  dispatcherData: DispatcherRegistrationData,
  companyUuid: string,
): Promise<Result<UpsertLoadResponse, ApiError>> => {
  const request: CreateDispatcherRequest = {
    name: dispatcherData.name,
    phoneNumber: cleanPhoneNumber(dispatcherData.phoneNumber),
    companyUuid: companyUuid,
  };

  try {
    const response = await axios.post(DISPATCHERS_BASE_URL, request);
    return {
      ok: true,
      data: response.data,
    };
  } catch (error: unknown) {
    return getApiError(error);
  }
};
