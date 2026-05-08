import axios from "axios";
import type { SearchCriteria } from "#/types/api/common/api-query-types";
import { LIKE_CLAUSE } from "#/shared/api/constants/apiQuery.constants";
import { BLANK_STRING, COLON } from "#/constants/common/global-constants";
import type { ApiError, Page, Result } from "#/shared/types/api.types";
import { getApiError } from "#/shared/api/utils/api.utils";

export const getContent = async <T>(
  endpoint: string,
  searchField: string,
  value: string,
  size: number,
  customSearchCriteria?: SearchCriteria[],
): Promise<Result<Page<T>, ApiError>> => {
  const searchCriteria = constructSearchCriteria(
    searchField,
    value,
    size,
    customSearchCriteria,
  );
  try {
    const response = await axios.get(endpoint, {
      params: searchCriteria,
    });
    return {
      ok: true,
      data: response.data,
    };
  } catch (error: any) {
    return getApiError(error);
  }
};

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
