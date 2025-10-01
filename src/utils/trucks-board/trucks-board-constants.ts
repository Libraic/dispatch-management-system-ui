import { BLANK_SPACE, BLANK_STRING } from "../constants/global-constants.ts";

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
