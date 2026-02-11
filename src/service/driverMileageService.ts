import axios from "axios";
import { DRIVERS_MILEAGE_BASE_URL } from "../constants/api/api-paths.ts";
import { handleApiErrors } from "../utils/api/api-common-error-utils.ts";
import type { UpsertDriversMileageRequestOld } from "../types/api/driver-mileage/driver-mileage-api-request-old-types.ts";
import type {
  DriversMileageGroup,
  DriverWeeklyMileageResponse,
} from "../types/internal/trucks-board/trucks-board-old-types.ts";
import {
  COMPANY_ID_QUERY_PARAM,
  END_DATE_QUERY_PARAM,
  GREATER_THAN_EQUAL_CLAUSE,
  JOIN_CLAUSE,
  LESS_THAN_EQUAL_CLAUSE,
  START_DATE_QUERY_PARAM,
} from "../constants/api/api-query-constants.ts";
import { COLON } from "../constants/common/global-constants.ts";
import { INTERNAL_SERVER_ERROR } from "../constants/error/error-message-constants.ts";
import { groupDriverWeeklyMileageByDispatcher } from "../utils/api/trucks-board/trucks-board-api-utils.ts";
import type { ApiResponse } from "../types/api/common/api-response-types.ts";
import type {
  Error,
  GroupsErrorResponse,
} from "../types/api/common/api-errors-types.ts";
import type {
  GetDriverMileageResponse,
  UpsertDriverMileageRequest,
  UpsertDriverMileageResponse,
} from "../types/api/driver-mileage/driver-mileage-api-types.ts";

export const upsertDriverMileage = async (
  upsertDriversMileageRequest: UpsertDriverMileageRequest,
): Promise<ApiResponse<UpsertDriverMileageResponse, Error>> => {
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

export const saveDriversMileageOld = async (
  upsertDriversMileageRequest: UpsertDriversMileageRequestOld,
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
    return handleApiErrors();
  }
};

export const fetchDriversMileageByCompanyUuidAndStartAndEndDate = async (
  companyUuid: string,
  week: string[],
): Promise<DriversMileageGroup[] | string> => {
  const startDate = week[0];
  const endDate = week[week.length - 1];

  const data = await fetchDriversMileage(companyUuid, startDate, endDate);

  if (data) {
    const groups = groupDriverWeeklyMileageByDispatcher(data);
    return Object.values(groups);
  } else {
    return INTERNAL_SERVER_ERROR;
  }
};

export const getDriversMileageByCompanyUuidAndStartAndEndDate = async (
  companyUuid: string,
  week: string[],
): Promise<ApiResponse<GetDriverMileageResponse[], Error>> => {
  const startDate = week[0];
  const endDate = week[week.length - 1];
  try {
    const response = await axios.get<
      ApiResponse<GetDriverMileageResponse[], Error>
    >(DRIVERS_MILEAGE_BASE_URL, {
      params: {
        [COMPANY_ID_QUERY_PARAM]: companyUuid,
        [START_DATE_QUERY_PARAM]: startDate,
        [END_DATE_QUERY_PARAM]: endDate,
      },
    });
    return response.data;
  } catch (error) {
    return handleApiErrors(error);
  }
};

const fetchDriversMileage = async (
  companyUuid: string,
  startDate: string,
  endDate: string,
): Promise<DriverWeeklyMileageResponse[] | undefined> => {
  try {
    const response = await axios.get<
      ApiResponse<DriverWeeklyMileageResponse[], Error>
    >(DRIVERS_MILEAGE_BASE_URL, {
      params: {
        [COMPANY_ID_QUERY_PARAM]: `${JOIN_CLAUSE}${COLON}${companyUuid}`,
        [START_DATE_QUERY_PARAM]: `${GREATER_THAN_EQUAL_CLAUSE}${COLON}${startDate}`,
        [END_DATE_QUERY_PARAM]: `${LESS_THAN_EQUAL_CLAUSE}${COLON}${endDate}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
