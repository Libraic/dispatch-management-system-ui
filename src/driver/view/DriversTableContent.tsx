import { DRIVERS_VIEW_COLUMNS_LAYOUT } from "../../utils/driver/driver-constants.ts";
import type { DriverData } from "../../types/api/driver-api.ts";
import * as React from "react";
import { NOT_AVAILABLE } from "../../utils/constants/global-constants.ts";

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
          <div>{`${driver.firstName} ${driver.lastName}`}</div>
          <div>{driver.truckNumber ?? NOT_AVAILABLE}</div>
          <div>{driver.trailerNumber ?? NOT_AVAILABLE}</div>
          <div>{driver.state}</div>
          <div>{driver.city}</div>
          <div className="hover:cursor-pointer font-black pb-[0.4rem]">...</div>
        </div>
      ))}
    </>
  );
};
