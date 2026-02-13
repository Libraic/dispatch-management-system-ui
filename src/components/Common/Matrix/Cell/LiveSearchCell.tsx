import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  BLANK_STRING,
  EMPTY_ARRAY,
} from "../../../../constants/common/global-constants.ts";
import { useLiveSearch } from "../../../../hooks/useLiveSearch.ts";
import type { Renderable } from "../../../../types/internal/classes/Renderable.ts";
import { InputFormSearchResult } from "../../LiveSearch/public/InputFormSearchResult.tsx";
import errorIcon from "../../../../assets/global/error.svg";
import { useHoverPanel } from "../../../../hooks/useHoverPanel.ts";
import { HoverableDescription } from "../../Typography/HoverableDescription.tsx";
import { useUnfocus } from "../../../../hooks/useUnfocus.ts";
import {
  LIVE_SEARCH_ENDPOINTS,
  type LiveSearchCellData,
} from "../../../../types/internal/live-search/live-search-data.ts";
import type { LiveSearchResult } from "../../../../types/api/common/api-response-types.ts";
import { usePagination } from "../../../../hooks/usePagination.ts";
import { DEFAULT_SIZE } from "../../../../constants/api/api-query-constants.ts";
import { SYSTEM_FONT_NORMAL } from "../../../../tailwind/tailwind-font-vars.ts";

export const LiveSearchCell = <D, R>({
  entityType,
  constructor,
  object,
  joinableEntityId,
  joinableEntityName,
  saveObject,
  customSearchCriteria,
  errorMessage,
  style,
}: LiveSearchCellData<D, R>) => {
  const [query, setQuery] = useState(BLANK_STRING);
  const [text, setText] = useState(BLANK_STRING);
  const [isRendered, setIsRendered] = useState(false);
  const endpoint = LIVE_SEARCH_ENDPOINTS[entityType].endpoint;
  const searchField = LIVE_SEARCH_ENDPOINTS[entityType].searchField;
  const [items, setItems] = useState<Renderable[]>([]);
  const [isLiveSearchActive, setIsLiveSearchActive] = useState(false);
  const pagination = usePagination(
    entityType,
    DEFAULT_SIZE,
    joinableEntityId,
    joinableEntityName,
  );
  const data: LiveSearchResult<D> = useLiveSearch(
    endpoint,
    searchField,
    query,
    isLiveSearchActive,
    pagination.getSize(),
    customSearchCriteria,
  );
  const hoverData = useHoverPanel(!!errorMessage);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const cellRef = useUnfocus(() => {
    setIsLiveSearchActive(false);
    setItems(EMPTY_ARRAY);
  }, [dropdownRef]);

  useEffect(() => {
    if (object) {
      setText(object.renderOnForm());
      setIsRendered(true);
    }
  }, [object]);

  useEffect(() => {
    setItems(data.items.map((item) => new constructor(item) as Renderable));
  }, [data, constructor]);

  useEffect(() => {
    if (cellRef.current) {
      const rect = cellRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: "absolute",
        top: rect.top + rect.height / 2 + window.scrollY - 50,
        left: rect.left + rect.width / 2 + window.scrollX,
        minWidth: rect.width,
        zIndex: 9999,
      });
    }
  }, [cellRef, items.length]);

  return (
    <div
      ref={cellRef}
      className="relative w-full h-full"
      onMouseEnter={hoverData.handleMouseEnter}
      onMouseLeave={hoverData.handleMouseLeave}
    >
      <div
        className={`${SYSTEM_FONT_NORMAL} text-[0.9rem] p-2 flex items-center bg-[#f5f7fc] w-full h-full caret-transparent ${style ?? BLANK_STRING}`}
        contentEditable
        suppressContentEditableWarning={true}
        onFocus={() => setIsLiveSearchActive(true)}
        onInput={(e: React.FormEvent<HTMLDivElement>) => {
          const input =
            !e.currentTarget.textContent || isRendered
              ? BLANK_STRING
              : e.currentTarget.textContent;
          setIsRendered(isRendered && false);
          setQuery(input);
          setText(input);
        }}
        ref={(el) => {
          if (el && el.innerHTML !== text) {
            el.innerHTML = text;
          }
        }}
      ></div>

      {items.length > 0 &&
        createPortal(
          <div style={dropdownStyle} ref={dropdownRef}>
            <InputFormSearchResult
              items={items}
              pagination={pagination}
              onItemSelected={(item: Renderable) => {
                if (saveObject) {
                  saveObject(item);
                }
                setText(item.renderOnForm());
                setQuery(BLANK_STRING);
                setItems(EMPTY_ARRAY);
                setIsRendered(true);
                setIsLiveSearchActive(false);
              }}
            />
          </div>,
          document.body,
        )}

      {hoverData.shouldDisplayMessage() &&
        createPortal(
          <div style={dropdownStyle}>
            <HoverableDescription message={errorMessage!!} icon={errorIcon} />
          </div>,
          document.body,
        )}
    </div>
  );
};
