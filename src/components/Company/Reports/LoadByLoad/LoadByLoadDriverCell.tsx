import {
  BACKGROUND_BLUE_GREY_COLOR,
  OUTLINE_PALE_BLUE,
} from "../../../../tailwind/tailwind-colors-vars.ts";
import React from "react";

export const LoadByLoadDriverCell: React.FC<{ data: string }> = ({ data }) => {
  return (
    <tr>
      <td
        rowSpan={9}
        className={`p-3 sticky left-0 z-100 outline-2 -outline-offset-1 ${OUTLINE_PALE_BLUE} ${BACKGROUND_BLUE_GREY_COLOR}`}
      >
        <p
          className="flex items-center justify-center text-center text-[1rem] w-[1rem]"
          style={{
            transform: "rotate(-90deg)",
            whiteSpace: "nowrap",
          }}
        >
          {data}
        </p>
      </td>
    </tr>
  );
};
