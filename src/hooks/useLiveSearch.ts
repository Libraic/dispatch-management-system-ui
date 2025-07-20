import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { getData } from "../service/live-search-service.ts";
import type { Error } from "../types/api/common.ts";
import { DEBOUNCING_TIME } from "../utils/constants/global.ts";

export type LiveSearchResult<T> = {
  items: T[];
  error: string | null;
};

const EMPTY_OBJECT = {
  items: [],
  error: null,
};

export const useLiveSearch = <T>(
  endpoint: string,
  searchField: string,
  query: string,
): LiveSearchResult<T> => {
  const [items, setItems] = useState<LiveSearchResult<T>>(EMPTY_OBJECT);
  useEffect(() => {
    const debounced = debounce((value: string) => {
      if (value.trim().length > 0) {
        getData<T[], Error>(endpoint, searchField, value).then((result) => {
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
