import { TableHead } from "../../../Common/Table/public/TableHead.tsx";
import { DriversTableContent } from "../internal/DriversTableContent.tsx";
import * as React from "react";
import type { DriverData } from "../../../../types/api/driver/driver-api-response-types.ts";
import {
  DRIVERS_VIEW_COLUMNS,
  DRIVERS_VIEW_COLUMNS_LAYOUT,
} from "../../../../constants/driver/drivers-table-constants.ts";

export const DriversTable: React.FC<{ drivers: DriverData[] }> = ({
  drivers,
}) => {
  return (
    <div className="h-fit">
      <div className="flex flex-col items-center justify-center text-solid-black">
        <TableHead
          columnsLayout={DRIVERS_VIEW_COLUMNS_LAYOUT}
          listColumns={DRIVERS_VIEW_COLUMNS}
        />
        <DriversTableContent drivers={drivers} />
      </div>
    </div>
  );
};
