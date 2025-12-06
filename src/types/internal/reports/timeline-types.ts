export const TimeFrame = {
  DAY: "DAY",
  MONTH: "MONTH",
  QUARTER: "QUARTER",
  YEAR: "YEAR",
};

export type TimeFrameUnit = (typeof TimeFrame)[keyof typeof TimeFrame];
