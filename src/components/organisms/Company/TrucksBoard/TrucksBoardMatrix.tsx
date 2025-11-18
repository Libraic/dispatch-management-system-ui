import { MatrixHeader } from "../../Header/MatrixHeader.tsx";
import {
  TRUCKS_BOARD_PRIMARY_COLUMNS,
  TRUCKS_BOARD_PRIMARY_COLUMNS_WIDTHS,
  TRUCKS_BOARD_WEEK_DAYS_COLUMNS_LAYOUT,
} from "../../../../constants/trucks-board/trucks-board-constants.ts";
import { BLANK_SPACE } from "../../../../constants/common/global-constants.ts";
import { getWeekWithDayAndMonth } from "../../../../utils/trucks-board/trucks-board-utils.ts";
import { DriversMileageView } from "./DriversMileageView.tsx";
import type { DriverWeeklyMileageData } from "../../../../hooks/useDriverWeeklyMileage.ts";
import * as React from "react";

export const TrucksBoardMatrix: React.FC<{
  driverWeeklyMileageData: DriverWeeklyMileageData;
  activeWeek: string[];
}> = ({ driverWeeklyMileageData, activeWeek }) => {
  return (
    <div className="flex-1 w-[95%] mx-auto overflow-x-auto">
      <MatrixHeader
        stickyColumns={TRUCKS_BOARD_PRIMARY_COLUMNS}
        stickyColumnsLayout={TRUCKS_BOARD_PRIMARY_COLUMNS_WIDTHS.replace(
          /_/g,
          BLANK_SPACE,
        )}
        scrollableColumns={getWeekWithDayAndMonth(activeWeek)}
        scrollableColumnsLayout={TRUCKS_BOARD_WEEK_DAYS_COLUMNS_LAYOUT}
      />
      <DriversMileageView driverWeeklyMileageData={driverWeeklyMileageData} />
    </div>
  );
};
