import * as React from "react";
import type { Pagination } from "../../../types/internal/pagination/pagination-types.ts";

export const InputFormLoadMoreItems: React.FC<{
  pagination: Pagination;
}> = ({ pagination }) => {
  return (
    <div>
      {pagination.getSize() < pagination.getNumberOfRecords() && (
        <div
          className="hover:cursor-pointer hover:text-solid-blue text-standard-size font-lato font-normal"
          onClick={pagination.increaseSize}
        >
          ...
        </div>
      )}
    </div>
  );
};
