import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { getData } from "#/service/liveSearchService";
import { DEBOUNCING_TIME } from "#/constants/common/global-constants";
import type { SearchCriteria } from "#/types/api/common/api-query-types";
import type { Error } from "#/types/api/common/api-errors-types";
import type { ApiResponse, LiveSearchResult } from "#/shared/types/api.types";

const getItems = <T>(result: ApiResponse<T[], Error>) => {
  return result.error !== null
    ? { items: [], error: result.error!.message }
    : { items: result.data ?? [], error: null };
};

export const useLiveSearch = <T>(
  endpoint: string,
  searchField: string,
  searchValue: string,
  isLiveSearchActive: boolean,
  size: number,
  defaultSearchCriteria?: SearchCriteria[],
): LiveSearchResult<T> => {
  const [items, setItems] = useState<LiveSearchResult<T>>({
    items: [],
    error: null,
  });
  useEffect(() => {
    const debounced = debounce((value: string) => {
      getData<T[], Error>(
        endpoint,
        searchField,
        value,
        size,
        defaultSearchCriteria,
      ).then((result) => setItems(getItems(result)));
    }, DEBOUNCING_TIME);

    if (isLiveSearchActive) {
      debounced(searchValue);
    }

    return () => debounced.cancel();
  }, [
    searchValue,
    endpoint,
    searchField,
    defaultSearchCriteria,
    isLiveSearchActive,
    size,
  ]);

  return items;
};
