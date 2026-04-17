import axios from "axios";
import type {
  Error,
  GroupsErrorResponse,
} from "#/types/api/common/api-errors-types";
import type { SearchCriteria } from "#/types/api/common/api-query-types";
import { LIKE_CLAUSE } from "#/shared/api/constants/apiQuery.constants";
import { BLANK_STRING, COLON } from "#/constants/common/global-constants";
import type { ApiResponse } from "#/shared/types/api.types";

const constructSearchCriteria = (
  defaultKey: string,
  defaultValue: string,
  size: number,
  customSearchCriteria?: SearchCriteria[],
): { [key: string]: string | number } => {
  const params = {
    page: 0,
    size: size,
  } as { [key: string]: string | number };

  if (defaultValue !== BLANK_STRING) {
    params[defaultKey] = `${LIKE_CLAUSE}${COLON}${defaultValue}`;
  }

  if (customSearchCriteria) {
    for (const searchCriteria of customSearchCriteria) {
      params[searchCriteria.field] = searchCriteria.operation;
    }
  }
  return params;
};

export const getData = async <T, E extends Error | GroupsErrorResponse>(
  endpoint: string,
  searchField: string,
  value: string,
  size: number,
  customSearchCriteria?: SearchCriteria[],
): Promise<ApiResponse<T, E>> => {
  const searchCriteria = constructSearchCriteria(
    searchField,
    value,
    size,
    customSearchCriteria,
  );
  try {
    const response = await axios.get<ApiResponse<T, E>>(endpoint, {
      params: searchCriteria,
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};
