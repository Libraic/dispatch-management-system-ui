import type { LiveSearchResultData } from "../types/live-search.ts";

export const LiveSearchResultList = ({
  items,
  onClick,
}: LiveSearchResultData) => {
  return (
    <div className="border-1 border-light-grey rounded-[0.3rem] bg-white p-2 min-w-[8rem] absolute top-16 z-10">
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
  );
};
