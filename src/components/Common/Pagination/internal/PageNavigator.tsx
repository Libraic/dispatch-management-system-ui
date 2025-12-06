import * as React from "react";
import previousIcon from "../../../../assets/global/previous.svg";
import nextIcon from "../../../../assets/global/next.svg";
import previousIconFocused from "../../../../assets/global/previous-focused.svg";
import nextIconFocused from "../../../../assets/global/next-focused.svg";
import type { Pagination } from "../../../../types/internal/pagination/pagination-types.ts";
import { PageMover } from "./PageMover.tsx";

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
        activeIcon={previousIconFocused}
        inactiveIcon={previousIcon}
        label="Previous"
        action={getPrevious}
      />
      <PageMover
        activeIcon={nextIconFocused}
        inactiveIcon={nextIcon}
        label="Next"
        action={getNext}
      />
    </div>
  );
};
