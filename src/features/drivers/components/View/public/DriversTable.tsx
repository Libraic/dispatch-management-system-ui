import { TableHead } from "#/ui/Table/public/TableHead";
import { DriversTableContent } from "#/features/drivers/components/View/internal/DriversTableContent";
import {
  DRIVERS_VIEW_COLUMNS,
  DRIVERS_VIEW_COLUMNS_LAYOUT,
} from "#/constants/driver/drivers-table-constants";

export const DriversTable = () => {
  return (
    <div className="h-[30rem]">
      <div className="flex flex-col text-solid-black">
        <TableHead
          columnsLayout={DRIVERS_VIEW_COLUMNS_LAYOUT}
          listColumns={DRIVERS_VIEW_COLUMNS}
        />
        <DriversTableContent />
      </div>
    </div>
  );
};
