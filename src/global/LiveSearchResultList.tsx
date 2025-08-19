import type { LiveSearchResultData } from "../types/live-search.ts";
import { useEffect, useRef, useState } from "react";

export const LiveSearchResultList = ({
  items,
  onClick,
}: LiveSearchResultData) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [isListVisible, setIsListVisible] = useState(true);

  const hideList = (e: MouseEvent) => {
    const target = e!!.target as Node;
    if (isListVisible && !listRef.current?.contains(target)) {
      setIsListVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", hideList);
  });

  return (
    isListVisible && (
      <div
        className="border-1 border-light-grey rounded-[0.3rem] bg-white p-2 min-w-[8rem] absolute top-16 z-10"
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
