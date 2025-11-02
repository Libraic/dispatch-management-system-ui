import axios from "axios";
import type { ApiResponse } from "../types/api/common/api-response-types.ts";
import type {
  Error,
  GroupsErrorResponse,
} from "../types/api/common/api-errors-types.ts";
import type { SearchCriteria } from "../types/api/common/api-query-types.ts";
import { LIKE_CLAUSE } from "../constants/api/api-query-constants.ts";
import { BLANK_STRING, COLON } from "../constants/common/global-constants.ts";

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
