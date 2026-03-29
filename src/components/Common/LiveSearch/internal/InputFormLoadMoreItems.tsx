import * as React from "react";
import type { Pagination } from "../../../../types/internal/pagination/pagination-types.ts";
import { HOVER_TEXT_SOLID_COLOR } from "../../../../tailwind/tailwind-colors-vars.ts";
import { LOAD_MORE_ELEMENTS } from "../../../../constants/common/global-constants.ts";
import { SYSTEM_FONT_NORMAL } from "../../../../tailwind/tailwind-font-vars.ts";

export const InputFormLoadMoreItems: React.FC<{
  pagination: Pagination;
}> = ({ pagination }) => {
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
