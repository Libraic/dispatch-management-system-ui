import type { ApiError, Result } from "#/shared/types/api.types";
import type { GetDispatchingDataResponse } from "#/features/planner/types/load.api.types";
import { PLANNING_BASE_URL } from "#/shared/api/constants/apiPaths.constants";
import { COMPANY_ID_QUERY_PARAM } from "#/shared/api/constants/apiQuery.constants";
import { getApiError } from "#/shared/api/utils/api.utils";
import api from "#/shared/api/client/apiClient";

const getStartAndEndDate = (week: string[]) => {
  const startDate = week[0];
  const [year, month, day] = startDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + 7);
  const resultYear = date.getFullYear();
  const resultMonth = String(date.getMonth() + 1).padStart(2, "0");
  const resultDay = String(date.getDate()).padStart(2, "0");
  const endDate = `${resultYear}-${resultMonth}-${resultDay}`;
  return { startDate, endDate };
};

export const getSchedulableDataByCompanyUuidAndStartAndEndDate = async (
  companyUuid: string,
  week: string[],
): Promise<Result<GetDispatchingDataResponse[], ApiError>> => {
  const { startDate, endDate } = getStartAndEndDate(week);
  try {
    const response = await api.get(PLANNING_BASE_URL, {
      params: {
        [COMPANY_ID_QUERY_PARAM]: companyUuid,
        startDate,
        endDate,
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
