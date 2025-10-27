import { HYPHEN } from "../../../../constants/common/global-constants.ts";
import { TimelineWeek } from "../../../atoms/Company/TrucksBoard/TimelineWeek.tsx";
import * as React from "react";
import { useState } from "react";

export const TrucksBoardTimeline: React.FC<{
  weeks: string[][];
  setActiveWeek: (week: string[]) => void;
}> = ({ weeks, setActiveWeek }) => {
  const [activeBars, setActiveBars] = useState<boolean[]>(
    weeks.map((_, i) => i === 2),
  );

  return (
    <div className="flex flex-row justify-center mt-10 mb-4">
      {weeks.map((week, index) => {
        const startDate = week[0];
        const endDate = week[week.length - 1];
        const interval = `${startDate} ${HYPHEN} ${endDate}`;
        return (
          <TimelineWeek
            key={index}
            interval={interval}
            isActive={activeBars[index]}
            setWeek={() => {
              setActiveWeek(weeks[index]);
              setActiveBars((prev) => prev.map((_, i) => i === index));
            }}
          />
        );
      })}
    </div>
  );
};
