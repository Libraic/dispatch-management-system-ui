import { TableCell } from "../../../atoms/Table/TableCell.tsx";
import * as React from "react";
import type { TruckData } from "../../../../types/api/truck/truck-api-response-types.ts";
import { TRUCKS_VIEW_COLUMNS_LAYOUT } from "../../../../constants/trucks/trucks-table-constants.ts";
import {
  HOVER_BORDER_B_NORMAL_COLOR,
  HOVER_BACKGROUND_NORMAL_COLOR,
  ODD_BACKGROUND_LIGHT_GRAY,
} from "../../../../tailwind/tailwind-colors-vars.ts";

export const TrucksTableContent: React.FC<{ trucks: TruckData[] }> = ({
  trucks,
}) => {
  return (
    <>
      {trucks.map((truck, index) => (
        <div
          key={index}
          className={`grid items-center ${TRUCKS_VIEW_COLUMNS_LAYOUT} ${ODD_BACKGROUND_LIGHT_GRAY} h-[2.75rem] w-[95%] font-plus-jakarta-sans font-normal text-[0.85rem] px-[2rem] ${HOVER_BACKGROUND_NORMAL_COLOR} ${HOVER_BORDER_B_NORMAL_COLOR} hover:text-white`}
        >
          <TableCell data={truck.truckNumber} />
          <TableCell data={truck.vinNumber} />
          <TableCell data={truck.model} />
          <TableCell data={truck.truckMake} />
          <TableCell data={truck.fuelType} />
          <div className="hover:cursor-pointer font-black pb-[0.4rem]">...</div>
        </div>
      ))}
    </>
  );
};
