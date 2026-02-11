import { IconButton } from "../../../Common/Button/IconButton.tsx";

import addRecordUnfocused from "../../../../assets/trucks-board/add-unfocused.svg";
import addRecordFocused from "../../../../assets/trucks-board/add-focused.svg";
import React from "react";
import { CalendarIconWrapper } from "../../../Common/Calendar/internal/CalendarIconWrapper.tsx";

export const TrucksBoardMenu: React.FC<{
  addAction: () => void;
  extractWeekFromCalendar: (date: Date[]) => void;
}> = ({ addAction, extractWeekFromCalendar }) => {
  return (
    <div className="flex justify-between mb-[1rem]">
      <div>
        <IconButton
          unfocusedResource={addRecordUnfocused}
          focusedResource={addRecordFocused}
          action={addAction}
          information="Add a new record"
        />
      </div>
      <div>
        <CalendarIconWrapper
          extractWeekFromCalendar={extractWeekFromCalendar}
        />
      </div>
    </div>
  );
};
