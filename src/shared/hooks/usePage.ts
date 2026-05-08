import { useCallback, useContext, useEffect, useState } from "react";
import type { ApiError, Page, Result } from "#/shared/types/api.types";
import { getEmptyPage } from "#/shared/utils/api.utils";
import { ToastContext } from "#/ui/Toast/context/ToastContext";

export const usePage = <T>(
  fetchFn: (pageNumber?: number) => Promise<Result<Page<T>, ApiError>>,
) => {
  const [data, setData] = useState<Page<T>>(getEmptyPage<T>());
  const [loading, setLoading] = useState(false);
  const { showToast } = useContext(ToastContext);

  const loadPage = useCallback(
    async (pageNumber = 0) => {
      setLoading(true);

      const response = await fetchFn(pageNumber);

      setLoading(false);

      if (!response.ok) {
        showToast(response.error.message);
        return;
      }

      setData(response.data);
    },
    [fetchFn, showToast],
  );

  useEffect(() => {
    loadPage().then(() => {});
  }, [loadPage]);

  return {
    data,
    loading,
    loadPage,
  };
};
