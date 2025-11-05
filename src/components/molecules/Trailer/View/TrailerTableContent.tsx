import { TableCell } from "../../../atoms/Table/TableCell.tsx";
import * as React from "react";
import type { TrailerData } from "../../../../types/api/trailer/trailer-api-response-types.ts";
import { TRAILERS_VIEW_COLUMNS_LAYOUT } from "../../../../constants/trailers/trailers-table-constants.ts";
import {
  HOVER_BORDER_B_NORMAL_COLOR,
  HOVER_BACKGROUND_NORMAL_COLOR,
} from "../../../../tailwind/tailwind-colors-vars.ts";

export const TrailersTableContent: React.FC<{ trailers: TrailerData[] }> = ({
  trailers,
}) => {
  return (
    <>
      {trailers.map((trailer, index) => (
        <div
          key={index}
          className={`grid items-center ${TRAILERS_VIEW_COLUMNS_LAYOUT} odd:bg-[#f4f4fb] h-[2.75rem] w-[95%] font-plus-jakarta-sans font-normal text-[0.85rem] px-[2rem] ${HOVER_BACKGROUND_NORMAL_COLOR} ${HOVER_BORDER_B_NORMAL_COLOR} hover:text-white`}
        >
          <TableCell data={trailer.trailerNumber} />
          <TableCell data={trailer.vinNumber} />
          <TableCell data={trailer.trailerYear} />
          <TableCell data={trailer.trailerMake} />
          <TableCell data={trailer.equipmentType} />
          <div className="hover:cursor-pointer font-black pb-[0.4rem]">...</div>
        </div>
      ))}
    </>
  );
};
