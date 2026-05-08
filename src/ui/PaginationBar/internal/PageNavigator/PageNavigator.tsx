import * as React from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { PageMover } from "#/ui/PaginationBar/internal/PageMover";
import {
  getNextPage,
  getPreviousPage,
} from "#/ui/PaginationBar/internal/PageNavigator/PageNavigator.utils";
import type { Pagination } from "#/shared/hooks/usePagination";

type PageNavigatorProps = {
  pagination: Pagination;
  fetchFn: (pageNumber: number) => void;
};

export const PageNavigator: React.FC<PageNavigatorProps> = ({
  pagination,
  fetchFn,
}) => {
  return (
    <div className="flex flex-row gap-x-4 items-center">
      <PageMover
        icon={<KeyboardArrowLeftIcon />}
        label="Previous"
        action={() => getPreviousPage(pagination, fetchFn)}
      />
      <PageMover
        icon={<KeyboardArrowRightIcon />}
        label="Next"
        action={() => getNextPage(pagination, fetchFn)}
      />
    </div>
  );
};
