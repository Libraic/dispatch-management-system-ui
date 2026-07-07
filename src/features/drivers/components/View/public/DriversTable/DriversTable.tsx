import { TableHead } from "#/ui/Table/public/TableHead";
import { DriversTableContent } from "#/features/drivers/components/View/internal/DriversTableContent";
import {
  DRIVERS_VIEW_COLUMNS,
  DRIVERS_VIEW_COLUMNS_LAYOUT,
} from "#/features/drivers/components/View/public/DriversTable/driversTable.constants";

export const DriversTable = () => {
  return (
    <div className="overflow-x-auto h-[30rem]">
      <div className="text-solid-black">
        <TableHead
          layout={DRIVERS_VIEW_COLUMNS_LAYOUT}
          columns={DRIVERS_VIEW_COLUMNS}
        />
        <DriversTableContent />
      </div>
    </div>
  );
};
