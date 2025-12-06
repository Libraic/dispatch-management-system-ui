import { DayPicker } from "./DayPicker.tsx";
import type { IntervalData } from "../../hooks/useInterval.ts";
import * as React from "react";

export const IntervalPicker: React.FC<{ intervalData: IntervalData }> = ({
  intervalData,
}) => {
  return (
    <div>
      <div className="flex flex-row items-center gap-x-[2rem]">
        <DayPicker
          date={intervalData.getStartDate()}
          setDate={intervalData.setStartDate}
        />
        <DayPicker
          date={intervalData.getEndDate()}
          setDate={intervalData.setEndDate}
        />
      </div>
    </div>
  );
};
