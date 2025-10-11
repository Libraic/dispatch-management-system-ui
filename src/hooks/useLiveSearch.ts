import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { getData } from "../service/live-search-service.ts";
import type {
  Error,
  LiveSearchResult,
  SearchCriteria,
} from "../types/api/common.ts";
import {
  BLANK_STRING,
  COLON,
  DEBOUNCING_TIME,
} from "../utils/constants/global-constants.ts";
import { LIKE_CLAUSE } from "../utils/api/api-query-constants.ts";

const constructSearchCriteria = (
  defaultKey: string,
  defaultValue: string,
  customSearchCriteria?: SearchCriteria[],
): any => {
  if (defaultValue === BLANK_STRING) {
    return {};
  }

  const params = { [defaultKey]: `${LIKE_CLAUSE}${COLON}${defaultValue}` };
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
  }, [query, endpoint, searchField, defaultSearchCriteria, isLiveSearchActive]);

  return items;
};
