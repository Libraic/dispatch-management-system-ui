import { TableCell } from "#/ui/Table/public/TableCell";
import * as React from "react";
import type { TrailerData } from "#/types/api/trailer/trailer-api-response-types";
import { TRAILERS_VIEW_COLUMNS_LAYOUT } from "#/constants/trailers/trailers-table-constants";
import {
  HOVER_BACKGROUND_NORMAL_COLOR,
  HOVER_BORDER_B_NORMAL_COLOR,
  ODD_BACKGROUND_LIGHT_GRAY,
} from "#/shared/constants/tailwind/tailwindColors.constants";
import type { Page } from "#/shared/types/api.types";

export const TrailersTableContent: React.FC<{
  trailers: Page<TrailerData>;
}> = ({ trailers }) => {
  return (
    <>
      {trailers.content.map((trailer, index) => (
        <div
          key={index}
          className={`grid items-center ${TRAILERS_VIEW_COLUMNS_LAYOUT} ${ODD_BACKGROUND_LIGHT_GRAY} h-[2.75rem] w-[100%] font-normal text-[0.85rem] px-[2rem] ${HOVER_BACKGROUND_NORMAL_COLOR} ${HOVER_BORDER_B_NORMAL_COLOR} hover:text-white`}
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
