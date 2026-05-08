import * as React from "react";
import { HOVER_TEXT_SOLID_COLOR } from "#/shared/constants/tailwind/tailwindColors.constants";
import { LOAD_MORE_ELEMENTS } from "#/constants/common/global-constants";
import type { Pagination } from "#/shared/hooks/usePagination";

type InputFormLoadMoreItemsProps = {
  pagination: Pagination;
};

export const InputFormLoadMoreItems: React.FC<InputFormLoadMoreItemsProps> = ({
  pagination,
}) => {
  return (
    <div>
      {pagination.getSize() < pagination.getNumberOfRecords() && (
        <div
          className={`hover:cursor-pointer ${HOVER_TEXT_SOLID_COLOR} text-[0.9rem] font-normal`}
          onClick={pagination.increaseSize}
        >
          {LOAD_MORE_ELEMENTS}
        </div>
      )}
    </div>
  );
};
