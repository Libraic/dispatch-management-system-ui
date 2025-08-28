import { ViewableCell } from "../../../matrix/ViewableCell.tsx";
import * as React from "react";
import type { Mileage } from "../../../types/financial/trucks-board.ts";
import {
  BLANK_SPACE,
  BLANK_STRING,
  DOLLAR_SIGN,
} from "../../../utils/constants/global-constants.ts";
import { formatNumericValue } from "../../../utils/matrix/cell-utils.ts";
import { getTotalRevenueAndMiles } from "../../../utils/trucks-board/trucks-board-utils.ts";

export const TotalRevenueAndMiles: React.FC<{ mileages: Mileage[] }> = ({
  mileages,
}) => {
  const [totalRevenue, totalMiles] = getTotalRevenueAndMiles(mileages);
  return (
    <div className="grid grid-rows-2">
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
