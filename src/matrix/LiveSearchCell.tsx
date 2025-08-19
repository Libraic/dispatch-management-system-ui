import * as React from "react";
import { useEffect, useState } from "react";
import type { LiveSearchCellData } from "../types/matrix/LiveSearchCellData.ts";
import { LiveSearchEndpoints } from "../types/forms.ts";
import { BLANK_STRING } from "../utils/constants/global.ts";
import { useLiveSearch } from "../hooks/useLiveSearch.ts";
import type { Renderable } from "../types/api/Renderable.ts";
import { useToast } from "../hooks/useToast.ts";
import { Toast } from "../toast/Toast.tsx";
import { LiveSearchResultList } from "../global/live-search/LiveSearchResultList.tsx";
import type { LiveSearchResult } from "../types/api/common.ts";

export const LiveSearchCell = <D, R>({
  defaultSearchKey,
  constructor,
  saveObject,
  customSearchCriteria,
}: LiveSearchCellData<D, R>) => {
  const [query, setQuery] = useState(BLANK_STRING);
  const [text, setText] = useState(BLANK_STRING);
  const [isRendered, setIsRendered] = useState(false);
  const endpoint = LiveSearchEndpoints[defaultSearchKey].endpoint;
  const searchField = LiveSearchEndpoints[defaultSearchKey].searchField;
  const [items, setItems] = useState<Renderable[]>([]);
  const toast = useToast();
  const data: LiveSearchResult<D> = useLiveSearch(
    endpoint,
    searchField,
    query,
    customSearchCriteria,
  );
  useEffect(() => {
    if (data.error !== null) {
      toast.withErrorMessage(data.error);
    } else {
      toast.clear();
      setItems(data.items.map((item) => new constructor(item) as Renderable));
    }
  }, [data]);

  return (
    <div className="relative">
      <div
        className="px-4 flex items-center bg-[#f5f7fc] border-r-1 border-[#e6ebfa] w-full h-full caret-transparent "
        contentEditable
        suppressContentEditableWarning={true}
        onInput={(e: React.FormEvent<HTMLDivElement>) => {
          const input =
            !e.currentTarget.textContent || isRendered
              ? BLANK_STRING
              : e.currentTarget.textContent;
          if (isRendered) {
            setIsRendered(false);
          }
          setQuery(input);
          setText(input);
        }}
        ref={(el) => {
          if (el && el.innerHTML !== text) {
            el.innerHTML = text;
          }
        }}
      ></div>
      {toast.getMessage().length === 0 && items.length > 0 && (
        <LiveSearchResultList
          items={items}
          onClick={(item: Renderable) => {
            setQuery(BLANK_STRING);
            setText(item.renderOnForm());
            setItems([]);
            setIsRendered(true);
            if (saveObject) {
              saveObject(item);
            }
          }}
        />
      )}

      {toast.getMessage().length > 0 && (
        <Toast
          key={toast.getIdentifier()}
          message={toast.getMessage()}
          type={toast.getOperationResult()}
        />
      )}
    </div>
  );
};
