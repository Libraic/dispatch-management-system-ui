import { BLANK_STRING } from "../constants/global-constants.ts";
import { getWeekWithNames } from "../global/date.ts";

export const TRUCKS_BOARD_PRIMARY_COLUMNS = [
  BLANK_STRING,
  "Dispatcher",
  "Driver",
  "Truck",
  "Revenue",
];

export const TRUCKS_BOARD_COLUMNS_LAYOUT =
  "grid-cols-[4rem_9rem_14rem_5.7rem_6rem_repeat(7,17rem)]";

export const WEEK_DAYS = getWeekWithNames(new Date());
export const COLUMNS = [...TRUCKS_BOARD_PRIMARY_COLUMNS, ...WEEK_DAYS];
