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
import errorIcon from "../assets/global/error.svg";
import { useHoverPanel } from "../hooks/useHoverPanel.ts";
import { HoverableInformation } from "../global/HoverableInformation.tsx";

const noErrorBackgroundStyle = "border-b-3 border-r-3 border-[#e6ebfa]";
const erroneousBackgroundStyle = "border-error-red/75 border-3";

export const LiveSearchCell = <D, R>({
  defaultSearchKey,
  constructor,
  saveObject,
  customSearchCriteria,
  errorMessage,
}: LiveSearchCellData<D, R>) => {
  const [query, setQuery] = useState(BLANK_STRING);
  const [text, setText] = useState(BLANK_STRING);
  const [isRendered, setIsRendered] = useState(false);
  const endpoint = LiveSearchEndpoints[defaultSearchKey].endpoint;
  const searchField = LiveSearchEndpoints[defaultSearchKey].searchField;
  const [items, setItems] = useState<Renderable[]>([]);
  const toast = useToast();
  const [bgColor, setBgColor] = useState(noErrorBackgroundStyle);
  const data: LiveSearchResult<D> = useLiveSearch(
    endpoint,
    searchField,
    query,
    customSearchCriteria,
  );
  const hoverData = useHoverPanel(!!errorMessage);

  useEffect(() => {
    setBgColor(
      errorMessage ? erroneousBackgroundStyle : noErrorBackgroundStyle,
    );
    if (data.error !== null) {
      toast.withErrorMessage(data.error);
    } else {
      toast.clear();
      setItems(data.items.map((item) => new constructor(item) as Renderable));
    }
  }, [data, errorMessage]);

  return (
    <div
      className="relative"
      onMouseEnter={hoverData.handleMouseEnter}
      onMouseLeave={hoverData.handleMouseLeave}
    >
      <div
        className={`px-4 flex items-center ${bgColor} border-b-3 border-r-3 border-[#e6ebfa] bg-[#f5f7fc] w-full h-full caret-transparent`}
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

      {hoverData.shouldDisplayMessage() && (
        <HoverableInformation
          message={errorMessage!!}
          icon={errorIcon}
          topPosition="top-[2rem]"
          leftPosition="left-[4.2rem]"
        />
      )}
    </div>
  );
};
