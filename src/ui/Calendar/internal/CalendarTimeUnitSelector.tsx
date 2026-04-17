import { createPortal } from "react-dom";
import { CalendarExpander } from "./CalendarExpander";
import * as React from "react";

type CalendarTimeUnitSelectorProps = {
  selectedValue: string;
  values: string[];
  top: number;
  left: number;
  expanderRef: React.RefObject<HTMLDivElement | null>;
  setValue: (value: string) => void;
  label?: string;
};

export const CalendarTimeUnitSelector: React.FC<
  CalendarTimeUnitSelectorProps
> = ({ selectedValue, values, setValue, top, expanderRef, left, label }) => {
  return (
    <div className="flex flex-row items-center">
      <p>{label ?? selectedValue}</p>
      {createPortal(
        <div
          className="absolute z-10001"
          style={{ top: `${top}px`, left: `${left}px` }}
        >
          <CalendarExpander
            data={values}
            selected={selectedValue}
            expanderRef={expanderRef}
            onClick={setValue}
          />
        </div>,
        document.body,
      )}
    </div>
  );
};
