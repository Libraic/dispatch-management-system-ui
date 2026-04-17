import * as React from "react";
import type { Pagination } from "#/types/internal/pagination/pagination-types";
import { HOVER_TEXT_SOLID_COLOR } from "#/tailwind/tailwind-colors-vars";
import { LOAD_MORE_ELEMENTS } from "#/constants/common/global-constants";
import { SYSTEM_FONT_NORMAL } from "#/tailwind/tailwind-font-vars";

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
          className={`hover:cursor-pointer ${HOVER_TEXT_SOLID_COLOR} text-standard-size ${SYSTEM_FONT_NORMAL}`}
          onClick={pagination.increaseSize}
        >
          {LOAD_MORE_ELEMENTS}
        </div>
      )}
    </div>
  );
};
