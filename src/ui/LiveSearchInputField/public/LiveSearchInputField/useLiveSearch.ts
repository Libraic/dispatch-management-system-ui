import { useContext, useEffect, useState } from "react";
import { debounce } from "lodash";
import { getContent } from "#/ui/LiveSearchInputField/api/liveSearch.api";
import { DEBOUNCING_TIME } from "#/constants/common/global-constants";
import type { SearchCriteria } from "#/types/api/common/api-query-types";
import type { Page } from "#/shared/types/api.types";
import { DEFAULT_PAGE_SIZE } from "#/shared/api/constants/api.constants";
import { getEmptyPage } from "#/shared/utils/api.utils";
import { ToastContext } from "#/ui/Toast/context/ToastContext";

export const useLiveSearch = <T>(
  endpoint: string,
  searchField: string,
  searchValue: string,
  isLiveSearchActive: boolean,
  defaultSearchCriteria?: SearchCriteria[],
): Page<T> => {
  const [items, setItems] = useState<Page<T>>(getEmptyPage());
  const { showToast } = useContext(ToastContext);
  useEffect(() => {
    const debounced = debounce((value: string) => {
      getContent<T>(
        endpoint,
        searchField,
        value,
        DEFAULT_PAGE_SIZE,
        defaultSearchCriteria,
      ).then((result) => {
        if (!result.ok) {
          showToast(result.error.message);
          return;
        }

        setItems(result.data);
      });
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
    showToast,
  ]);

  return items;
};
