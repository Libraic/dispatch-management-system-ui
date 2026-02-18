import type { LiveSearchResultData } from "../../../../types/api/live-search/live-search-response-types.ts";
import { InputFormItemsList } from "../internal/InputFormItemsList.tsx";
import { InputFormLoadMoreItems } from "../internal/InputFormLoadMoreItems.tsx";

export const InputFormSearchResult = ({
  items,
  pagination,
  onItemSelected,
  ref,
}: LiveSearchResultData) => {
  return (
    <div className="relative" ref={ref}>
      {items.length > 0 && (
        <div className="flex flex-col items-center justify-center border-1 border-light-grey rounded-[0.3rem] bg-white p-2 min-w-[9rem] absolute top-[-4rem] left-[2rem] z-102 max-h-[14rem] overflow-y-auto">
          <InputFormItemsList items={items} onClick={onItemSelected} />
          <InputFormLoadMoreItems pagination={pagination} />
        </div>
      )}
    </div>
  );
};
