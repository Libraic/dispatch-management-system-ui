import type {
  LoadData,
  LoadStatus,
} from "#/types/internal/planner/planner-types";
import type {
  GetLoadResponse,
  GetLoadStartingPointResponse,
  UpsertLoadResponse,
} from "#/features/planner/types/load.api.types";
import axios from "axios";
import {
  LOADS_BASE_URL,
  LOADS_DOCUMENTS,
  LOADS_RELATIONS_URL,
  LOADS_STARTING_POINT_PATH,
} from "#/shared/api/constants/apiPaths.constants";
import type {
  ApiError,
  NoContentResponse,
  Result,
} from "#/shared/types/api.types";
import { getApiError } from "#/shared/api/utils/api.utils";
import { toUpsertLoadRequest } from "#/features/planner/utils/loads.transformer";

export const upsertLoad = async (
  loadData: LoadData,
  relationId: string,
  loadStatus?: LoadStatus,
): Promise<Result<UpsertLoadResponse, ApiError>> => {
  const upsertRequest = toUpsertLoadRequest(loadData, relationId);
  if (loadStatus) {
    upsertRequest.loadStatus = loadStatus;
  }

  try {
    const response = await axios.put(LOADS_BASE_URL, upsertRequest);
    return {
      ok: true,
      data: response.data,
    };
  } catch (error: unknown) {
    return getApiError(error);
  }
};

export const deleteLoadByUuid = async (
  loadUuid: string,
): Promise<Result<NoContentResponse, ApiError>> => {
  try {
    const response = await axios.delete(LOADS_BASE_URL + `/${loadUuid}`);
    return {
      ok: true,
      data: response.data,
    };
  } catch (error: any) {
    return getApiError(error);
  }
};

export const getLoadData = async (
  relationId: string,
  startDate: string,
  endDate: string,
): Promise<Result<GetLoadResponse[], ApiError>> => {
  const url = LOADS_RELATIONS_URL + `/${relationId}`;
  const params = {
    startDate,
    endDate,
  };
  try {
    const response = await axios.get(url, {
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

export const ingestDocument = async (
  file: File,
): Promise<Result<GetLoadResponse, ApiError>> => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const ingestResponse = await axios.post(LOADS_DOCUMENTS, formData);
    return {
      ok: true,
      data: ingestResponse.data,
    };
  } catch (error) {
    return getApiError(error);
  }
};

export const getStartingPointLocation = async (
  relationUuid: string,
  date: string,
): Promise<Result<GetLoadStartingPointResponse, ApiError>> => {
  const url =
    LOADS_RELATIONS_URL + `/${relationUuid}` + LOADS_STARTING_POINT_PATH;
  const params = {
    date,
  };
  try {
    const response = await axios.get(url, {
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
