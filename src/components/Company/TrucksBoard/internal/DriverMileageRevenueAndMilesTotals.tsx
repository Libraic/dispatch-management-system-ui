import { ViewableCell } from "../../../Common/Matrix/Cell/ViewableCell.tsx";
import * as React from "react";
import type { Mileage } from "../../../../types/internal/trucks-board/trucks-board-old-types.ts";
import {
  BLANK_SPACE,
  BLANK_STRING,
  DOLLAR_SIGN,
} from "../../../../constants/common/global-constants.ts";
import { formatNumericValue } from "../../../../utils/matrix/cell-utils.ts";
import { getTotalRevenueAndMiles } from "../../../../utils/trucks-board/trucks-board-old-utils.ts";

export const DriverMileageRevenueAndMilesTotals: React.FC<{
  mileages: Mileage[];
}> = ({ mileages }) => {
  const [totalRevenue, totalMiles] = getTotalRevenueAndMiles(mileages);
  return (
    <div className="grid grid-rows-2 h-full">
      <ViewableCell
        data={`${totalRevenue !== 0 ? DOLLAR_SIGN + BLANK_SPACE + formatNumericValue(totalRevenue.toString()) : BLANK_STRING}`}
        font="bold"
      ></ViewableCell>
      <ViewableCell
        data={`${totalMiles !== 0 ? formatNumericValue(totalMiles.toString()) : BLANK_STRING}`}
        font="bold"
      ></ViewableCell>
    </div>
  );
};
