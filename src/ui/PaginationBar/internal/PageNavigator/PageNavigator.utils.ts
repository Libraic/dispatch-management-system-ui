import type { Pagination } from "#/shared/hooks/usePagination";

export const getPreviousPage = (
  pagination: Pagination,
  fetchFn: (pageNumber: number) => void,
) => {
  pagination.setCurrentPage((prev) => {
    const page = prev > 1 ? prev - 1 : prev;
    if (page !== pagination.getCurrentPage()) {
      fetchFn(page - 1);
    }
    return page;
  });
};

export const getNextPage = (
  pagination: Pagination,
  fetchFn: (pageNumber: number) => void,
) => {
  pagination.setCurrentPage((prev) => {
    const page = prev < pagination.getNumberOfPages() ? prev + 1 : prev;
    if (page !== pagination.getCurrentPage()) {
      fetchFn(page - 1);
    }
    return page;
  });
};
