import { DRIVERS_VIEW_COLUMNS_LAYOUT } from "../../../../constants/driver/drivers-table-constants.ts";
import * as React from "react";
import type { DriverData } from "../../../../types/api/driver/driver-api-response-types.ts";
import { TableCell } from "../../../atoms/Table/TableCell.tsx";

export const DriversTableContent: React.FC<{ drivers: DriverData[] }> = ({
  drivers,
}) => {
  return (
    <>
      {drivers.map((driver, index) => (
        <div
          key={index}
          className={`grid items-center ${DRIVERS_VIEW_COLUMNS_LAYOUT} h-[2.75rem] w-[95%] font-plus-jakarta-sans font-normal text-[0.85rem] px-[2rem] hover:bg-light-blue hover:border-b-light-blue hover:text-white border-b-2 border-b-[#ebecf0]`}
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
