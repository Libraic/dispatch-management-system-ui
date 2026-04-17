import { useEffect, useState } from "react";
import {
  Entity,
  type PaginationData,
} from "#/types/api/common/api-query-types";
import { DEFAULT_SIZE } from "#/shared/api/constants/apiQuery.constants";
import { getPaginationDetails } from "#/service/paginationService";
import type { Pagination } from "#/types/internal/pagination/pagination-types";

export const usePagination = (
  entityType: Entity,
  size: number = DEFAULT_SIZE,
  joinableEntityId?: string,
  joinableEntityName?: string,
): Pagination => {
  const [paginationDetails, setPaginationDetails] = useState<PaginationData>({
    pages: 0,
    size: size,
  });
  const [activePage, setActivePage] = useState(1);
  const [currentSize, setCurrentSize] = useState(size);

  useEffect(() => {
    if (entityType === Entity.CITY) {
      setPaginationDetails({ pages: 0, size: DEFAULT_SIZE });
    } else {
      getPaginationDetails(
        entityType,
        size,
        joinableEntityId,
        joinableEntityName,
      ).then((data) => {
        setPaginationDetails(data);
      });
    }
  }, [joinableEntityId, entityType, joinableEntityName, size]);

  const increaseSize = () => {
    setCurrentSize((prev) => {
      const newSize = prev + size;
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
