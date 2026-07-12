import type { ActiveTimePart } from "#/ui/TimePicker/public/TimePicker.types";
import { BLANK_STRING } from "#/constants/common/global-constants";
import type { Time } from "#/types/internal/planner/planner-types";
import type { FC } from "react";

const renderTimeUnit = (isEditMode: boolean, rawValue: string) => {
  if (isEditMode) {
    return rawValue;
  }

  return rawValue.padStart(2, "0");
};

const getPartClassName = (
  isEditMode: boolean,
  part: ActiveTimePart,
  activePart: ActiveTimePart,
): string => {
  const active = isEditMode && activePart === part;
  return `flex items-center justify-center rounded-[0.45rem] ${part === "hour" ? "px-[0.1rem]" : "pl-[0.1rem]"} py-[0.1rem] ${active ? "bg-solid-blue text-white" : BLANK_STRING}`;
};

type TimePickerProps = {
  activeTimePart: ActiveTimePart;
  activeInput: string;
  displayedTime: Time;
  isEditMode: boolean;
};

export const TimeRenderer: FC<TimePickerProps> = ({
  activeTimePart,
  activeInput,
  displayedTime,
  isEditMode,
}) => {
  return (
    <span
      className={`flex-1 flex items-center font-normal text-[0.85rem] tracking-[0.04em]`}
    >
      <span className={getPartClassName(isEditMode, "hour", activeTimePart)}>
        {activeTimePart === "hour" && activeInput
          ? renderTimeUnit(isEditMode, activeInput)
          : renderTimeUnit(isEditMode, displayedTime.hour)}
      </span>
      <span>:</span>
      <span className={getPartClassName(isEditMode, "minute", activeTimePart)}>
        {activeTimePart === "minute" && activeInput
          ? renderTimeUnit(isEditMode, activeInput)
          : renderTimeUnit(isEditMode, displayedTime.minute)}
      </span>
      <span className="ml-1" />
      <span className={getPartClassName(isEditMode, "period", activeTimePart)}>
        {displayedTime.period}
      </span>
    </span>
  );
};
