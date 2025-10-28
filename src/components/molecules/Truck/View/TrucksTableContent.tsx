import { TableCell } from "../../../atoms/Table/TableCell.tsx";
import * as React from "react";
import type { TruckData } from "../../../../types/api/truck/truck-api-response-types.ts";
import { TRUCKS_VIEW_COLUMNS_LAYOUT } from "../../../../constants/trucks/trucks-table-constants.ts";

export const TrucksTableContent: React.FC<{ trucks: TruckData[] }> = ({
  trucks,
}) => {
  return (
    <>
      {trucks.map((truck, index) => (
        <div
          key={index}
          className={`grid items-center ${TRUCKS_VIEW_COLUMNS_LAYOUT} h-[2.75rem] w-[95%] font-plus-jakarta-sans font-normal text-[0.85rem] px-[2rem] hover:bg-light-blue hover:border-b-light-blue hover:text-white border-b-2 border-b-[#ebecf0]`}
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
