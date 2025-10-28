import { ListHeader } from "../../../molecules/ListView/ListHeader.tsx";
import {
  TRUCKS_VIEW_COLUMNS,
  TRUCKS_VIEW_COLUMNS_LAYOUT,
} from "../../../../constants/trucks/trucks-table-constants.ts";
import * as React from "react";
import type { TruckData } from "../../../../types/api/truck/truck-api-response-types.ts";
import { TrucksTableContent } from "../../../molecules/Truck/View/TrucksTableContent.tsx";

export const TrucksTable: React.FC<{ trucks: TruckData[] }> = ({ trucks }) => {
  return (
    <div className="h-[30rem]">
      <div className="flex flex-col items-center justify-center text-solid-black">
        <ListHeader
          columnsLayout={TRUCKS_VIEW_COLUMNS_LAYOUT}
          listColumns={TRUCKS_VIEW_COLUMNS}
        />
        <TrucksTableContent trucks={trucks} />
      </div>
    </div>
  );
};
