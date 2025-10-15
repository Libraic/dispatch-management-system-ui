import { DriversTableHeader } from "./DriversTableHeader.tsx";
import { DriversTableContent } from "./DriversTableContent.tsx";
import * as React from "react";
import type { DriverData } from "../../types/api/driver-api.ts";

export const DriversTable: React.FC<{ drivers: DriverData[] }> = ({
  drivers,
}) => {
  return (
    <div className="h-[30rem]">
      <div className="flex flex-col items-center justify-center text-solid-black">
        <DriversTableHeader />
        <DriversTableContent drivers={drivers} />
      </div>
    </div>
  );
};
