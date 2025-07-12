import type { LiveSearchResultData } from "../types/live-search.ts";

export const LiveSearchResultList = ({
  items,
  onClick,
}: LiveSearchResultData) => {
  return (
    <div className="border-2 border-light-grey rounded-xl bg-white p-2 min-w-[8rem] absolute left-5 top-full mt-3 z-10">
      {items.map((item) => (
        <div
          key={item.getUuid()}
          className="w-full rounded hover:bg-[#edf2fe] hover:text-solid-blue hover:cursor-pointer text-standard-size font-lato font-light text-center"
          onClick={() => onClick(item)}
        >
          {item.render()}
        </div>
      ))}
    </div>
  );
};
