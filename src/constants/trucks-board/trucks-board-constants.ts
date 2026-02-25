import { BLANK_SPACE, BLANK_STRING } from "../common/global-constants.ts";

export const TRUCKS_BOARD_PRIMARY_COLUMNS = [
  BLANK_STRING,
  "Driver",
  "Truck",
  "Revenue",
];

export const TRUCKS_BOARD_PRIMARY_COLUMNS_WIDTHS = "3rem_11rem_4.9rem_4.2rem";

export const TRUCKS_BOARD_WEEK_DAYS_COLUMNS_LAYOUT = "repeat(14,12.05rem)";

export const TRUCKS_BOARD_COLUMNS_LAYOUT = `${TRUCKS_BOARD_PRIMARY_COLUMNS_WIDTHS.replace(/_/g, BLANK_SPACE)} ${TRUCKS_BOARD_WEEK_DAYS_COLUMNS_LAYOUT}`;

export const Z_INDEX_TRUCKS_BOARD_TABLE = 100;

export const TRUCKS_BOARD_ROW_HEIGHT = "h-[4.5rem]";
export const TRUCKS_BOARD_GRID_LAYOUT =
  "grid-cols-[10rem_10rem_5rem_4rem_3.5rem_repeat(14,8rem)]";
export const TRUCKS_BOARD_TEXT_SIZE = "text-[0.8rem]";
export const TRUCKS_BOARD_VERTICAL_MARGIN = "my-[1.5rem]";
