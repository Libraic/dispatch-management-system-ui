import type { ApiError, Result } from "#/shared/types/api.types";
import type { GetDispatchingDataResponse } from "#/features/planner/types/load.api.types";
import { toIsoDate } from "#/utils/global/date-utils";
import axios from "axios";
import { PLANNING_BASE_URL } from "#/shared/api/constants/apiPaths.constants";
import {
  COMPANY_ID_QUERY_PARAM,
  END_DATE_QUERY_PARAM,
  START_DATE_QUERY_PARAM,
} from "#/shared/api/constants/apiQuery.constants";
import { getApiError } from "#/shared/api/utils/api.utils";

export const getSchedulableDataByCompanyUuidAndStartAndEndDate = async (
  companyUuid: string,
  week: string[],
): Promise<Result<GetDispatchingDataResponse[], ApiError>> => {
  const startDate = week[0];
  const endDateObject = new Date(week[week.length - 1]);
  endDateObject.setDate(endDateObject.getDate() + 7);
  const endDate = toIsoDate(endDateObject);
  try {
    const response = await axios.get(PLANNING_BASE_URL, {
      params: {
        [COMPANY_ID_QUERY_PARAM]: companyUuid,
        [START_DATE_QUERY_PARAM]: startDate,
        [END_DATE_QUERY_PARAM]: endDate,
      },
    });
    return {
      ok: true,
      data: response.data,
    };
  } catch (error) {
    return getApiError(error);
  }
};
