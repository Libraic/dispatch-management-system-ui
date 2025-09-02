import type {
  ApiResponse,
  Error,
  GroupsErrorResponse,
} from "../types/api/common.ts";
import axios from "axios";
import { DRIVERS_MILEAGE_BASE_URL } from "../utils/api/api-paths.ts";
import { handleApiErrors } from "../utils/api/common-api-error-utils.ts";
import type { UpsertDriversMileageRequest } from "../types/api/driver-mileage-api.ts";
import type { DriverWeeklyMileageResponse } from "../types/financial/trucks-board.ts";
import {
  COMPANY_ID_QUERY_PARAM,
  JOIN_CLAUSE,
} from "../utils/api/api-query-constants.ts";
import {
  COLON,
  EQUAL_SIGN,
  QUESTION_MARK,
} from "../utils/constants/global-constants.ts";
import type { Void } from "../types/global.ts";

export const saveDriversMileage = async (
  upsertDriversMileageRequest: UpsertDriversMileageRequest,
): Promise<
  ApiResponse<DriverWeeklyMileageResponse[], Error | GroupsErrorResponse>
> => {
  try {
    const response = await axios.put(
      DRIVERS_MILEAGE_BASE_URL,
      upsertDriversMileageRequest,
    );
    return response.data;
  } catch (error: any) {
    return handleApiErrors(error);
  }
};

export const fetchDriversMileageByCompanyUuid = async (
  companyUuid: string,
): Promise<DriverWeeklyMileageResponse[] | undefined> => {
  try {
    const url =
      DRIVERS_MILEAGE_BASE_URL +
      QUESTION_MARK +
      COMPANY_ID_QUERY_PARAM +
      EQUAL_SIGN +
      JOIN_CLAUSE +
      COLON +
      companyUuid;
    const response =
      await axios.get<ApiResponse<DriverWeeklyMileageResponse[], Error>>(url);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteDriversMileageByUuids = async (
  ids: string[],
): Promise<ApiResponse<Void, Error>> => {
  try {
    const response = await axios.delete(DRIVERS_MILEAGE_BASE_URL, {
      data: ids,
    });
    return response.data;
  } catch (error: any) {
    return handleApiErrors(error);
  }
};
