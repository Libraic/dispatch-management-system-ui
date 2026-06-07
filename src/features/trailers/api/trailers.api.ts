import { TRAILERS_BASE_URL } from "#/shared/api/constants/apiPaths.constants";
import type { TrailerData } from "#/types/api/trailer/trailer-api-response-types";
import {
  COMPANY_ID_QUERY_PARAM,
  DEFAULT_SIZE,
  JOIN_CLAUSE,
  PAGE,
  SIZE,
} from "#/shared/api/constants/apiQuery.constants";
import { COLON } from "#/constants/common/global-constants";
import type { ApiError, Page, Result } from "#/shared/types/api.types";
import { getApiError } from "#/shared/api/utils/api.utils";
import type { TrailerRegistrationData } from "#/types/internal/trailer/trailer-registration-types";
import { getCreateTrailerRequest } from "#/utils/trailer/trailer-utils";
import api from "#/shared/api/client/apiClient";

export const saveTrailer = async (
  trailerData: TrailerRegistrationData,
  companyUuid: string,
): Promise<Result<TrailerData, ApiError>> => {
  const createTrailerRequest = getCreateTrailerRequest(
    trailerData,
    companyUuid!!,
  );
  try {
    const response = await api.post(TRAILERS_BASE_URL, createTrailerRequest);
    return {
      ok: true,
      data: response.data,
    };
  } catch (error: any) {
    return getApiError(error);
  }
};

export const getTrailers = async (
  companyUuid: string,
  page?: number,
): Promise<Result<Page<TrailerData>, ApiError>> => {
  try {
    const params = {
      [COMPANY_ID_QUERY_PARAM]: `${JOIN_CLAUSE}${COLON}${companyUuid}`,
      [SIZE]: DEFAULT_SIZE,
      ...(page !== undefined && { [PAGE]: page }),
    };
    const response = await api.get(TRAILERS_BASE_URL, {
      params: params,
    });
    return {
      ok: true,
      data: response.data,
    };
  } catch (error: any) {
    return getApiError(error);
  }
};
