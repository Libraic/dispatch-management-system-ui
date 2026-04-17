import { TableHead } from "#/ui/Table/public/TableHead";
import {
  TRUCKS_VIEW_COLUMNS,
  TRUCKS_VIEW_COLUMNS_LAYOUT,
} from "#/constants/trucks/trucks-table-constants";
import * as React from "react";
import type { TruckData } from "#/types/api/truck/truck-api-response-types";
import { TrucksTableContent } from "#/components/Truck/View/internal/TrucksTableContent";

export const TrucksTable: React.FC<{ trucks: TruckData[] }> = ({ trucks }) => {
  return (
    <div className="h-[30rem]">
      <div className="flex flex-col text-solid-black">
        <TableHead
          columnsLayout={TRUCKS_VIEW_COLUMNS_LAYOUT}
          listColumns={TRUCKS_VIEW_COLUMNS}
        />
        <TrucksTableContent trucks={trucks} />
      </div>
    </div>
  );
};
