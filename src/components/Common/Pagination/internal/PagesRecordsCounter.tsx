import * as React from "react";
import { SYSTEM_FONT_BOLD } from "../../../../tailwind/tailwind-font-vars.ts";

export const PagesRecordsCounter: React.FC<{ records: number }> = ({
  records,
}) => {
  return (
    <div
      className={`border-[0.09rem] rounded-[0.2rem] border-[#cccccc] px-2 ${SYSTEM_FONT_BOLD} text-[0.9rem] text-solid-black tracking-wide`}
    >
      {records} Records
    </div>
  );
};
