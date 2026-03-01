import { DRIVERS_VIEW_COLUMNS_LAYOUT } from "../../../../constants/driver/drivers-table-constants.ts";
import * as React from "react";
import type { DriverData } from "../../../../types/api/driver/driver-api-response-types.ts";
import { TableCell } from "../../../Common/Table/public/TableCell.tsx";
import {
  HOVER_BORDER_B_NORMAL_COLOR,
  HOVER_BACKGROUND_NORMAL_COLOR,
  ODD_BACKGROUND_LIGHT_GRAY,
} from "../../../../tailwind/tailwind-colors-vars.ts";
import { SYSTEM_FONT_NORMAL } from "../../../../tailwind/tailwind-font-vars.ts";

export const DriversTableContent: React.FC<{ drivers: DriverData[] }> = ({
  drivers,
}) => {
  return (
    <>
      {drivers.map((driver, index) => (
        <div
          key={index}
          className={`grid items-center ${DRIVERS_VIEW_COLUMNS_LAYOUT} ${ODD_BACKGROUND_LIGHT_GRAY} h-[2.75rem] ${SYSTEM_FONT_NORMAL} text-[0.85rem] px-[2rem] ${HOVER_BACKGROUND_NORMAL_COLOR} ${HOVER_BORDER_B_NORMAL_COLOR} hover:text-white w-[100%]`}
        >
          <TableCell data={`${driver.firstName} ${driver.lastName}`} />
          <TableCell data={driver.truckNumber} />
          <TableCell data={driver.trailerNumber} />
          <TableCell data={driver.state} />
          <TableCell data={driver.city} />
          <div className="hover:cursor-pointer font-black pb-[0.4rem]">...</div>
        </div>
      ))}
    </>
  );
};
