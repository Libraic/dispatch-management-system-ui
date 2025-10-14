import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { LiveSearchCellData } from "../types/matrix/LiveSearchCellData.ts";
import { LiveSearchEndpoints } from "../types/forms.ts";
import { BLANK_STRING } from "../utils/constants/global-constants.ts";
import { useLiveSearch } from "../hooks/useLiveSearch.ts";
import type { Renderable } from "../types/api/Renderable.ts";
import { useToast } from "../hooks/useToast.ts";
import { LiveSearchResultList } from "../global/live-search/LiveSearchResultList.tsx";
import type { LiveSearchResult } from "../types/api/common.ts";
import errorIcon from "../assets/global/error.svg";
import { useHoverPanel } from "../hooks/useHoverPanel.ts";
import { HoverableInformation } from "../global/HoverableInformation.tsx";
import {
  ERRONEOUS_BACKGROUND_STYLE,
  NO_ERROR_BACKGROUND_STYLE,
} from "../utils/matrix/cell-constants.ts";
import { ToastRenderer } from "../toast/ToastRenderer.tsx";
import { useBlur } from "../hooks/useBlur.ts";

export const LiveSearchCell = <D, R>({
  defaultSearchKey,
  constructor,
  object,
  saveObject,
  customSearchCriteria,
  errorMessage,
  style,
}: LiveSearchCellData<D, R> & {
  style?: React.CSSProperties;
}) => {
  const [query, setQuery] = useState(BLANK_STRING);
  const [text, setText] = useState(BLANK_STRING);
  const [isRendered, setIsRendered] = useState(false);
  const endpoint = LiveSearchEndpoints[defaultSearchKey].endpoint;
  const searchField = LiveSearchEndpoints[defaultSearchKey].searchField;
  const [items, setItems] = useState<Renderable[]>([]);
  const toast = useToast();
  const [isLiveSearchActive, setIsLiveSearchActive] = useState(false);
  const data: LiveSearchResult<D> = useLiveSearch(
    endpoint,
    searchField,
    query,
    isLiveSearchActive,
    customSearchCriteria,
  );
  const hoverData = useHoverPanel(!!errorMessage);
  const isMounted = useRef(false);

  const cellRef = useBlur(() => setIsLiveSearchActive(false));
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  if (!isMounted.current) {
    if (object) {
      setText(object.renderOnForm());
      setIsRendered(true);
    }
    isMounted.current = true;
  }

  useEffect(() => {
    if (data.error !== null) {
      toast.withErrorMessage(data.error);
    } else {
      toast.reset();
      setItems(data.items.map((item) => new constructor(item) as Renderable));
    }
  }, [data, errorMessage, constructor, toast]);

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
  }, [items.length]);

  return (
    <div
      ref={cellRef}
      className="relative w-full h-full"
      style={style}
      onMouseEnter={hoverData.handleMouseEnter}
      onMouseLeave={hoverData.handleMouseLeave}
    >
      <div
        className={`p-2 flex justify-center items-center ${
          errorMessage ? ERRONEOUS_BACKGROUND_STYLE : NO_ERROR_BACKGROUND_STYLE
        } border-b-3 border-r-3 border-[#e6ebfa] bg-[#f5f7fc] w-full h-full caret-transparent`}
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

      {toast.getMessage().length === 0 &&
        items.length > 0 &&
        createPortal(
          <div style={dropdownStyle}>
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
          </div>,
          document.body,
        )}

      <ToastRenderer toast={toast} />

      {hoverData.shouldDisplayMessage() &&
        createPortal(
          <div style={dropdownStyle}>
            <HoverableInformation
              message={errorMessage!!}
              icon={errorIcon}
              topPosition="top-[2rem]"
              leftPosition="left-[4.2rem]"
            />
          </div>,
          document.body,
        )}
    </div>
  );
};
