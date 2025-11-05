import * as React from "react";
import type { Pagination } from "../../../types/internal/pagination/pagination-types.ts";
import { HOVER_TEXT_SOLID_COLOR } from "../../../tailwind/tailwind-colors-vars.ts";

export const InputFormLoadMoreItems: React.FC<{
  pagination: Pagination;
}> = ({ pagination }) => {
  return (
    <div>
      {pagination.getSize() < pagination.getNumberOfRecords() && (
        <div
          className={`hover:cursor-pointer ${HOVER_TEXT_SOLID_COLOR} text-standard-size font-lato font-normal`}
          onClick={pagination.increaseSize}
        >
          ...
        </div>
      )}
    </div>
  );
};
