import { TableHead } from "#/ui/Table/public/TableHead";
import { DriversTableContent } from "#/features/drivers/components/View/internal/DriversTableContent";
import {
  DRIVERS_VIEW_COLUMNS,
  DRIVERS_VIEW_COLUMNS_LAYOUT,
} from "#/features/drivers/components/View/public/DriversTable/driversTable.constants";

export const DriversTable = () => {
  return (
    <div className="h-[30rem]">
      <div className="flex flex-col text-solid-black">
        <TableHead
          layout={DRIVERS_VIEW_COLUMNS_LAYOUT}
          columns={DRIVERS_VIEW_COLUMNS}
        />
        <DriversTableContent />
      </div>
    </div>
  );
};
