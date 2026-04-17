import * as React from "react";
import { usePagination } from "#/hooks/usePagination";
import { PageSelector } from "#/ui/PaginationBar/internal/PageSelector";
import { PagesCounter } from "#/ui/PaginationBar/internal/PagesCounter";
import { PageNavigator } from "#/ui/PaginationBar/internal/PageNavigator/PageNavigator";
import { DRIVERS_PAGE_SIZE } from "#/constants/driver/drivers-table-constants";
import type { Entity } from "#/types/api/common/api-query-types";

type PaginationBarProps = {
  joinableEntityId: string;
  entityType: Entity;
  fetchFn: (pageNumber: number) => void;
};

export const PaginationBar: React.FC<PaginationBarProps> = ({
  joinableEntityId,
  entityType,
  fetchFn,
}) => {
  const pagination = usePagination(
    entityType,
    DRIVERS_PAGE_SIZE,
    joinableEntityId,
  );
  return (
    <div className="flex items-center justify-between">
      <PagesCounter records={pagination.getNumberOfRecords()} />
      <PageSelector pagination={pagination} fetchFn={fetchFn} />
      <PageNavigator pagination={pagination} fetchFn={fetchFn} />
    </div>
  );
};
