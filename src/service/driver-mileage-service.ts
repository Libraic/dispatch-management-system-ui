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
  END_DATE_QUERY_PARAM,
  GREATER_THAN_EQUAL_CLAUSE,
  JOIN_CLAUSE,
  LESS_THAN_EQUAL_CLAUSE,
  START_DATE_QUERY_PARAM,
} from "../utils/api/api-query-constants.ts";
import {
  BLANK_SPACE,
  COLON,
  DOT,
  HIPHEN,
} from "../utils/constants/global-constants.ts";
import type { Void } from "../types/global.ts";
import { CURRENT_YEAR } from "../utils/global/date.ts";

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
  weekDays: string[],
): Promise<DriverWeeklyMileageResponse[] | undefined> => {
  const startDateParts = weekDays[0].split(BLANK_SPACE)[1].split(DOT);
  const endDateParts = weekDays[weekDays.length - 1]
    .split(BLANK_SPACE)[1]
    .split(DOT);
  const startDate =
    startDateParts[1] + HIPHEN + startDateParts[0] + HIPHEN + CURRENT_YEAR;
  const endDate =
    endDateParts[1] + HIPHEN + endDateParts[0] + HIPHEN + CURRENT_YEAR;
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
