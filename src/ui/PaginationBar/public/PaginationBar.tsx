import * as React from "react";
import { PageSelector } from "#/ui/PaginationBar/internal/PageSelector";
import { ItemsCounter } from "#/ui/PaginationBar/internal/ItemsCounter";
import { PageNavigator } from "#/ui/PaginationBar/internal/PageNavigator/PageNavigator";
import type { Pagination } from "#/shared/hooks/usePagination";

type PaginationBarProps = {
  fetchFn: (pageNumber: number) => void;
  pagination: Pagination;
};

export const PaginationBar: React.FC<PaginationBarProps> = ({
  fetchFn,
  pagination,
}) => {
  return (
    <div className="flex items-center justify-between">
      <ItemsCounter records={pagination.getNumberOfRecords()} />
      <PageSelector pagination={pagination} fetchFn={fetchFn} />
      <PageNavigator pagination={pagination} fetchFn={fetchFn} />
    </div>
  );
};
