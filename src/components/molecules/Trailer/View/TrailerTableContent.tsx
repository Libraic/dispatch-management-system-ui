import { TableCell } from "../../../atoms/TableView/TableCell.tsx";
import * as React from "react";
import type { TrailerData } from "../../../../types/api/trailer/trailer-api-response-types.ts";
import { TRAILERS_VIEW_COLUMNS_LAYOUT } from "../../../../constants/trailers/trailers-table-constants.ts";

export const TrailersTableContent: React.FC<{ trailers: TrailerData[] }> = ({
  trailers,
}) => {
  return (
    <>
      {trailers.map((trailer, index) => (
        <div
          key={index}
          className={`grid items-center ${TRAILERS_VIEW_COLUMNS_LAYOUT} h-[2.75rem] w-[95%] font-plus-jakarta-sans font-normal text-[0.85rem] px-[2rem] hover:bg-light-blue hover:border-b-light-blue hover:text-white border-b-2 border-b-[#ebecf0]`}
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
