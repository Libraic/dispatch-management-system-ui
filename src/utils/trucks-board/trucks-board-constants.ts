import { BLANK_SPACE } from "../constants/global-constants.ts";

export const TRUCKS_BOARD_PRIMARY_COLUMNS = [
  "Dispatcher",
  "Driver",
  "Truck",
  "Revenue",
];

export const TRUCKS_BOARD_PRIMARY_COLUMNS_WIDTHS = "8rem_14rem_4.8rem_5.5rem";

export const TRUCKS_BOARD_WEEK_DAYS_COLUMNS_LAYOUT = "repeat(7,17rem)";

export const TRUCKS_BOARD_COLUMNS_LAYOUT = `${TRUCKS_BOARD_PRIMARY_COLUMNS_WIDTHS.replace(/_/g, BLANK_SPACE)} ${TRUCKS_BOARD_WEEK_DAYS_COLUMNS_LAYOUT}`;

export const Z_INDEX_TRUCKS_BOARD_TABLE = 100;
