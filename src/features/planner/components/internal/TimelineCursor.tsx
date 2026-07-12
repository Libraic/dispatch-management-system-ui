import { type FC, useCallback, useEffect, useRef } from "react";
import {
  DAY_CELL_WIDTH,
  METADATA_WIDTH,
} from "#/constants/planner/planner-constants";
import { BLANK_SPACE } from "#/constants/common/global-constants";
import { Z_INDEX_2 } from "#/shared/constants/tailwind/tailwindLayout.constants";
import { getDayProgress, getZonedIsoDate } from "#/shared/utils/timezone.utils";

type TimelineCursorProps = {
  days: string[];
  timeZone: string;
};

export const TimelineCursor: FC<TimelineCursorProps> = ({ days, timeZone }) => {
  const lineRef = useRef<HTMLDivElement>(null);

  const updateTimeLine = useCallback(() => {
    if (!lineRef.current) return;

    const now = new Date();

    const isoNow = getZonedIsoDate(now, timeZone);
    const isoDates = days.map((day) => day.split(BLANK_SPACE)[1]);
    const dayIndex = isoDates.findIndex((isoDate) => isoDate === isoNow);

    if (dayIndex < 0) {
      lineRef.current.style.visibility = "hidden";
      return;
    }

    const dayProgress = getDayProgress(now, timeZone);
    const rems = dayProgress * DAY_CELL_WIDTH;

    lineRef.current.style.visibility = "visible";
    lineRef.current.style.left = `${METADATA_WIDTH + dayIndex * DAY_CELL_WIDTH + rems}rem`;
  }, [days, timeZone]);

  useEffect(() => {
    updateTimeLine();
    const interval = setInterval(updateTimeLine, 60_000);

    return () => clearInterval(interval);
  }, [updateTimeLine]);

  return (
    <div
      ref={lineRef}
      className={`absolute top-0 h-full w-0.5 bg-red-500/70 pointer-events-none ${Z_INDEX_2}`}
    />
  );
};
