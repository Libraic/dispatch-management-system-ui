import * as React from "react";

type PagesCounterProps = {
  records: number;
};

export const ItemsCounter: React.FC<PagesCounterProps> = ({ records }) => {
  return (
    <div
      className={`border-[0.09rem] rounded-[0.2rem] border-[#cccccc] px-2 font-bold text-[0.9rem] text-solid-black tracking-wide`}
    >
      {records} Records
    </div>
  );
};
