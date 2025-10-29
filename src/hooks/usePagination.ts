import { useEffect, useState } from "react";
import type { Pagination } from "../types/internal/pagination/pagination-types.ts";
import {
  PageableEntity,
  type PaginationData,
} from "../types/api/common/api-query-types.ts";
import { DEFAULT_SIZE } from "../constants/api/api-query-constants.ts";
import { getPaginationDetails } from "../service/paginationService.ts";

export const usePagination = (
  entityType: PageableEntity,
  joinableEntityId?: string,
): Pagination => {
  const [paginationDetails, setPaginationDetails] = useState<PaginationData>({
    pages: 0,
    size: DEFAULT_SIZE,
  });
  const [activePage, setActivePage] = useState(1);
  const [currentSize, setCurrentSize] = useState(DEFAULT_SIZE);

  useEffect(() => {
    getPaginationDetails(entityType, joinableEntityId).then((data) => {
      setPaginationDetails(data);
    });
  }, [joinableEntityId, entityType]);

  const increaseSize = () => {
    setCurrentSize((prev) => {
      const newSize = prev + DEFAULT_SIZE;
      return newSize > paginationDetails.size
        ? paginationDetails.size
        : newSize;
    });
  };

  return {
    getNumberOfRecords: () => paginationDetails.size,
    getNumberOfPages: () => paginationDetails.pages,
    getCurrentPage: () => activePage,
    increaseSize: increaseSize,
    getSize: () => currentSize,
    setCurrentPage: setActivePage,
  };
};
