import { v4 as uuidv4 } from "uuid";
import React from "react";
import {
  BACKGROUND_BLUE_GREY_COLOR,
  OUTLINE_PALE_BLUE,
} from "../../../../tailwind/tailwind-colors-vars.ts";
import type { SpanValue } from "../../../../types/internal/kpi/load-by-load-internal-types.ts";

export const LoadByLoadDataRow: React.FC<{
  dataLabel: string;
  data: SpanValue[];
}> = ({ dataLabel, data }) => {
  return (
    <tr key={uuidv4()} className="text-[0.9rem]">
      <React.Fragment>
        <td
          className={`p-[0.55rem] outline-2 -outline-offset-1 ${OUTLINE_PALE_BLUE} ${BACKGROUND_BLUE_GREY_COLOR} font-bold sticky left-[2.5rem] z-100`}
        >
          <p>{dataLabel}</p>
        </td>
        {data.map((value) => (
          <td
            key={uuidv4()}
            colSpan={value.span}
            className={`p-[0.55rem] outline-2 -outline-offset-1 ${OUTLINE_PALE_BLUE} font-light text-center`}
          >
            <p>{value.value}</p>
          </td>
        ))}
      </React.Fragment>
    </tr>
  );
};
