import type { Period, Time } from "../planner/planner-types.ts";

export interface DrumProps {
  items: string[];
  selected: string;
  onChange: (value: string) => void;
}

export interface PeriodButtonProps {
  label: Period;
  active: boolean;
  onClick: () => void;
}

export interface TimePickerProps {
  time: Time;
  setTime: (time: Time) => void;
  label?: string;
}
