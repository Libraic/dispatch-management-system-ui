import { TableCell } from "#/ui/Table/public/TableCell";
import * as React from "react";
import type { TruckData } from "#/types/api/truck/truck-api-response-types";
import { TRUCKS_VIEW_COLUMNS_LAYOUT } from "#/constants/trucks/trucks-table-constants";
import {
  HOVER_BACKGROUND_NORMAL_COLOR,
  HOVER_BORDER_B_NORMAL_COLOR,
  ODD_BACKGROUND_LIGHT_GRAY,
} from "#/shared/constants/tailwind/tailwindColors.constants";

export const TrucksTableContent: React.FC<{ trucks: TruckData[] }> = ({
  trucks,
}) => {
  return (
    <>
      {trucks.map((truck, index) => (
        <div
          key={index}
          className={`grid items-center ${TRUCKS_VIEW_COLUMNS_LAYOUT} ${ODD_BACKGROUND_LIGHT_GRAY} h-[2.75rem] font-normal text-[0.85rem] px-[2rem] ${HOVER_BACKGROUND_NORMAL_COLOR} ${HOVER_BORDER_B_NORMAL_COLOR} hover:text-white w-[100%]`}
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
