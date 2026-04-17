import { type FC, useCallback, useEffect, useRef } from "react";
import {
  DAY_CELL_WIDTH,
  METADATA_WIDTH,
} from "#/constants/planner/planner-constants";
import { toIsoDate } from "#/utils/global/date-utils";
import { BLANK_SPACE } from "#/constants/common/global-constants";
import { Z_INDEX_NORMAL_PRECEDENCE } from "#/tailwind/tailwind-layout-vars";

export const TimelineCursor: FC<{ days: string[] }> = ({ days }) => {
  const lineRef = useRef<HTMLDivElement>(null);

  const updateTimeLine = useCallback(() => {
    if (!lineRef.current) return;
    const now = new Date();
    const isoNow = toIsoDate(now);
    const isoDates = days.map((day) => day.split(BLANK_SPACE)[1]);
    const dayIndex = isoDates.findIndex((isoDate) => isoDate === isoNow);
    if (dayIndex < 0) {
      lineRef.current.style.visibility = "hidden";
      return;
    }

    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);
    const timePassedFromStartOfDay =
      (now.getTime() - startOfDay.getTime()) / 86400000;
    const rems = timePassedFromStartOfDay * DAY_CELL_WIDTH;
    lineRef.current.style.visibility = "visible";
    lineRef.current.style.left = `${METADATA_WIDTH + dayIndex * DAY_CELL_WIDTH + rems}rem`;
  }, [days]);

  useEffect(() => {
    updateTimeLine();
    const interval = setInterval(updateTimeLine, 60_000);
    return () => clearInterval(interval);
  }, [updateTimeLine]);

  return (
    <div
      ref={lineRef}
      className={`absolute top-0 bottom-0 w-0.5 bg-red-500/70 pointer-events-none ${Z_INDEX_NORMAL_PRECEDENCE}`}
    />
  );
};
