import type { GetDriversPlanningDataResponse } from "../types/api/loads/load-api-types.ts";
import type { ApiResponse } from "../types/api/common/api-response-types.ts";
import { handleApiErrors } from "../utils/api/api-common-error-utils.ts";
import { toIsoDate } from "../utils/global/date-utils.ts";
import axios from "axios";
import { PLANNING_BASE_URL } from "../constants/api/api-paths.ts";
import {
  COMPANY_ID_QUERY_PARAM,
  END_DATE_QUERY_PARAM,
  START_DATE_QUERY_PARAM,
} from "../constants/api/api-query-constants.ts";
import type { Error } from "../types/api/common/api-errors-types.ts";

export const getPlanningDataByCompanyUuidAndStartAndEndDate = async (
  companyUuid: string,
  week: string[],
): Promise<ApiResponse<GetDriversPlanningDataResponse[], Error>> => {
  const startDate = week[0];
  const endDateObject = new Date(week[week.length - 1]);
  endDateObject.setDate(endDateObject.getDate() + 7);
  const endDate = toIsoDate(endDateObject);
  try {
    const response = await axios.get<
      ApiResponse<GetDriversPlanningDataResponse[], Error>
    >(PLANNING_BASE_URL, {
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
