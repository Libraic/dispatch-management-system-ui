import * as React from "react";

import { PageableEntity } from "../../../types/api/common/api-query-types.ts";
import { usePagination } from "../../../hooks/usePagination.ts";
import { PageSelector } from "../../atoms/Pagination/PageSelector.tsx";
import { PagesRecordsCounter } from "../../atoms/Pagination/PagesRecordsCounter.tsx";
import { PageNavigator } from "../../molecules/Pagination/PageNavigator.tsx";

export const PaginationBar: React.FC<{
  joinableEntityId: string;
  entityType: PageableEntity;
  fetchFn: (pageNumber: number) => void;
}> = ({ joinableEntityId, entityType, fetchFn }) => {
  const pagination = usePagination(entityType, joinableEntityId);

  return (
    <div className="flex items-center justify-between mx-[2.7rem]">
      <PagesRecordsCounter records={pagination.getNumberOfRecords()} />
      <PageSelector pagination={pagination} fetchFn={fetchFn} />
      <PageNavigator pagination={pagination} fetchFn={fetchFn} />
    </div>
  );
};
