import { useEffect, useState } from "react";
import type { Pagination } from "../types/internal/pagination/pagination-types.ts";
import {
  PageableEntity,
  type PaginationData,
} from "../types/api/common/api-query-types.ts";
import { DEFAULT_SIZE } from "../constants/api/api-query-constants.ts";
import { getPaginationDetails } from "../service/paginationService.ts";

export const usePagination = (
  joinableEntityId: string,
  entityType: PageableEntity,
): Pagination => {
  const [paginationDetails, setPaginationDetails] = useState<PaginationData>({
    pages: 0,
    size: DEFAULT_SIZE,
  });
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    getPaginationDetails(joinableEntityId, entityType).then((data) => {
      setPaginationDetails(data);
    });
  }, [joinableEntityId, entityType]);

  return {
    getNumberOfRecords: () => paginationDetails.size,
    getNumberOfPages: () => paginationDetails.pages,
    getCurrentPage: () => activePage,
    setCurrentPage: setActivePage,
  };
};
