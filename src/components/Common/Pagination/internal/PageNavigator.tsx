import * as React from "react";
import type { Pagination } from "../../../../types/internal/pagination/pagination-types.ts";
import { PageMover } from "./PageMover.tsx";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export const PageNavigator: React.FC<{
  pagination: Pagination;
  fetchFn: (pageNumber: number) => void;
}> = ({ pagination, fetchFn }) => {
  const getPrevious = () => {
    pagination.setCurrentPage((prev) => {
      const page = prev > 1 ? prev - 1 : prev;
      if (page !== pagination.getCurrentPage()) {
        fetchFn(page - 1);
      }
      return page;
    });
  };

  const getNext = () => {
    pagination.setCurrentPage((prev) => {
      const page = prev < pagination.getNumberOfPages() ? prev + 1 : prev;
      if (page !== pagination.getCurrentPage()) {
        fetchFn(page - 1);
      }
      return page;
    });
  };

  return (
    <div className="flex flex-row gap-x-4 items-center">
      <PageMover
        icon={<KeyboardArrowLeftIcon />}
        label="Previous"
        action={getPrevious}
      />
      <PageMover
        icon={<KeyboardArrowRightIcon />}
        label="Next"
        action={getNext}
      />
    </div>
  );
};
