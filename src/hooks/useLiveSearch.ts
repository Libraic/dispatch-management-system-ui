import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { getData } from "../service/liveSearchService.ts";
import {
  BLANK_STRING,
  COLON,
  DEBOUNCING_TIME,
} from "../constants/common/global-constants.ts";
import {
  DEFAULT_SIZE,
  LIKE_CLAUSE,
} from "../constants/api/api-query-constants.ts";
import type { SearchCriteria } from "../types/api/common/api-query-types.ts";
import type { LiveSearchResult } from "../types/api/common/api-response-types.ts";

type StringRecord = {
  [key: string]: string | number;
};

const constructSearchCriteria = (
  defaultKey: string,
  defaultValue: string,
  size: number,
  customSearchCriteria?: SearchCriteria[],
): StringRecord => {
  const params = {
    page: 0,
    size: size,
  } as StringRecord;

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

export const useLiveSearch = <T>(
  endpoint: string,
  searchField: string,
  query: string,
  isLiveSearchActive: boolean,
  size: number = DEFAULT_SIZE,
  defaultSearchCriteria?: SearchCriteria[],
): LiveSearchResult<T> => {
  const [items, setItems] = useState<LiveSearchResult<T>>({
    items: [],
    error: null,
  });
  useEffect(() => {
    const debounced = debounce((value: string) => {
      const searchCriteria = constructSearchCriteria(
        searchField,
        value,
        size,
        defaultSearchCriteria,
      );
      getData<T[], Error>(endpoint, searchCriteria).then((result) => {
        const localItems =
          result.error !== null
            ? { items: [], error: result.error!.message }
            : { items: result.data ?? [], error: null };
        setItems(localItems);
      });
    }, DEBOUNCING_TIME);

    if (isLiveSearchActive) {
      debounced(query);
    }

    return () => debounced.cancel();
  }, [
    query,
    endpoint,
    searchField,
    defaultSearchCriteria,
    isLiveSearchActive,
    size,
  ]);

  return items;
};
