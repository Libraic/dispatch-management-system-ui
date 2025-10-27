import { useState } from "react";
import { useBlur } from "../../../hooks/useBlur.ts";
import type { LiveSearchResultData } from "../../../types/api/live-search/live-search-response-types.ts";

export const LiveSearchResultList = ({
  items,
  onClick,
}: LiveSearchResultData) => {
  const [isListVisible, setIsListVisible] = useState(true);
  const listRef = useBlur(() => setIsListVisible(false));
  return (
    isListVisible && (
      <div
        className="border-1 border-light-grey rounded-[0.3rem] bg-white p-2 min-w-[8rem] absolute top-14 z-102 max-h-[12rem] overflow-y-auto"
        ref={listRef}
      >
        {items.map((item) => (
          <div
            key={item.getUuid()}
            className="w-full rounded hover:bg-[#edf2fe] hover:text-solid-blue hover:cursor-pointer text-standard-size font-lato font-normal text-center"
            onClick={() => onClick(item)}
          >
            {item.renderOnList()}
          </div>
        ))}
      </div>
    )
  );
};
