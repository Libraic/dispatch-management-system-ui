import {
  TRUCKS_BOARD_COLUMNS_LAYOUT,
  Z_INDEX_TRUCKS_BOARD_TABLE,
} from "./trucks-board-constants.ts";
import * as React from "react";

export const TRUCKS_BOARD_LAYOUT_STYLES = {
  gridTemplateColumns: TRUCKS_BOARD_COLUMNS_LAYOUT,
  gridAutoRows: "min-content", // each driver will make a row
};

export const getDispatcherLiveSearchCellStyles = (
  numberOfGroups: number,
): React.CSSProperties => {
  return {
    gridRow: `1 / ${numberOfGroups + 1}`,
    alignSelf: "stretch",
    position: "sticky",
    left: 0,
    writingMode: "sideways-lr",
    borderLeft: "0.2rem solid #e6ebfa",
  };
};

export const getStickyCellStyles = (
  leftOffset: string,
  zIndexOffset: number,
): React.CSSProperties => {
  return {
    left: leftOffset,
    zIndex: Z_INDEX_TRUCKS_BOARD_TABLE - 1 - zIndexOffset,
    position: "sticky",
  };
};
