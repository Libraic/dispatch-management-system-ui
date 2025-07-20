import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { getData } from "../service/live-search-service.ts";
import type {
  Error,
  LiveSearchResult,
  SearchCriteria,
} from "../types/api/common.ts";
import { DEBOUNCING_TIME } from "../utils/constants/global.ts";

const EMPTY_OBJECT = {
  items: [],
  error: null,
};

const constructSearchCriteria = (
  defaultKey: string,
  defaultValue: string,
  customSearchCriteria?: SearchCriteria[],
): any => {
  const params = { [defaultKey]: `like:${defaultValue}` };
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
      if (value.trim().length > 0) {
        getData<T[], Error>(
          endpoint,
          constructSearchCriteria(searchField, value, defaultSearchCriteria),
        ).then((result) => {
          if (result.error !== null) {
            setItems({
              items: [],
              error: result.error!.message,
            });
          } else {
            setItems({
              items: result.data ?? [],
              error: null,
            });
          }
        });
      } else {
        setItems(EMPTY_OBJECT);
      }
    }, DEBOUNCING_TIME);

    debounced(query);

    return () => debounced.cancel();
  }, [query, endpoint, searchField]);

  return items;
};
