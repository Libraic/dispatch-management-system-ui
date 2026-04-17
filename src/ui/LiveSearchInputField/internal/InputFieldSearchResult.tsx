import { InputFieldItemsList } from "#/ui/LiveSearchInputField/internal/InputFieldItemsList";
import { InputFormLoadMoreItems } from "#/ui/LiveSearchInputField/internal/InputFormLoadMoreItems";
import type { Pagination } from "#/types/internal/pagination/pagination-types";
import type { Renderable } from "#/types/internal/classes/Renderable";
import React from "react";

type InputFieldSearchResultProps = {
  items: Renderable[];
  pagination: Pagination;
  onItemSelected: (item: Renderable) => void;
  ref?: React.RefObject<HTMLDivElement | null>;
};

export const InputFieldSearchResult = ({
  items,
  pagination,
  onItemSelected,
  ref,
}: InputFieldSearchResultProps) => {
  return (
    <div className="relative" ref={ref}>
      {items.length > 0 && (
        <div className="flex flex-col items-center justify-center border-1 border-light-grey rounded-[0.3rem] bg-white p-2 min-w-[9rem] absolute top-[-4rem] left-[2rem] z-102 max-h-[14rem] overflow-y-auto">
          <InputFieldItemsList items={items} onClick={onItemSelected} />
          <InputFormLoadMoreItems pagination={pagination} />
        </div>
      )}
    </div>
  );
};
