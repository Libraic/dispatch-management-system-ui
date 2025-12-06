import { createPortal } from "react-dom";
import { CalendarExpander } from "./CalendarExpander.tsx";
import * as React from "react";

export const CalendarTimeUnitSelector: React.FC<{
  selectedValue: string;
  values: string[];
  top: number;
  left: number;
  expanderRef: React.RefObject<HTMLDivElement | null>;
  setValue: (value: string) => void;
  label?: string;
}> = ({ selectedValue, values, setValue, top, expanderRef, left, label }) => {
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
