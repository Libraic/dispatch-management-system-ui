import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { getData } from "../service/live-search-service.ts";
import type {
  Error,
  LiveSearchResult,
  SearchCriteria,
} from "../types/api/common.ts";
import { COLON, DEBOUNCING_TIME } from "../utils/constants/global-constants.ts";
import { LIKE_CLAUSE } from "../utils/api/api-query-constants.ts";

const EMPTY_OBJECT = {
  items: [],
  error: null,
};

const constructSearchCriteria = (
  defaultKey: string,
  defaultValue: string,
  customSearchCriteria?: SearchCriteria[],
): any => {
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
  defaultSearchCriteria?: SearchCriteria[],
): LiveSearchResult<T> => {
  const [items, setItems] = useState<LiveSearchResult<T>>(EMPTY_OBJECT);
  useEffect(() => {
    const debounced = debounce((value: string) => {
      if (value.trim().length === 0) {
        setItems(EMPTY_OBJECT);
        return;
      }

      if (value.trim().length > 0) {
        getData<T[], Error>(
          endpoint,
          constructSearchCriteria(searchField, value, defaultSearchCriteria),
        ).then((result) => {
          const localItems =
            result.error !== null
              ? { items: [], error: result.error!.message }
              : { items: result.data ?? [], error: null };
          setItems(localItems);
        });
      }
    }, DEBOUNCING_TIME);

    debounced(query);

    return () => debounced.cancel();
  }, [query, endpoint, searchField, defaultSearchCriteria]);

  return items;
};
