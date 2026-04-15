import * as React from "react";
import { useState } from "react";
import { CalendarExpanderDropdownList } from "./CalendarExpanderDropdownList.tsx";
import { useOnClickOutside } from "../../../../hooks/useClickOutside.ts";
import { GoogleIcon } from "../../../../shared/components/GoogleIcon/GoogleIcon.tsx";

export const CalendarExpander: React.FC<{
  data: string[];
  selected: string;
  expanderRef: React.RefObject<HTMLDivElement | null>;
  onClick: (value: string) => void;
}> = ({ data, selected, expanderRef, onClick }) => {
  const [iconLabel, setIconLabel] = useState("keyboard_arrow_down");
  const [isExpanded, setIsExpanded] = useState(false);
  useOnClickOutside(expanderRef, () => {
    setIconLabel("keyboard_arrow_down");
    setIsExpanded(false);
  });
  return (
    <div className="relative flex items-center" ref={expanderRef}>
      <div
        className="w-[1.5rem] pt-[0.25rem] hover:cursor-pointer"
        onClick={() => {
          setIconLabel(
            !isExpanded ? "keyboard_control_key" : "keyboard_arrow_down",
          );
          setIsExpanded((prev) => !prev);
        }}
      >
        <GoogleIcon code={iconLabel} size={1.4} />
      </div>
      <CalendarExpanderDropdownList
        isExpanded={isExpanded}
        selectedValue={selected}
        data={data}
        onClick={(value) => {
          onClick(value);
          setIsExpanded(false);
          setIconLabel("keyboard_arrow_down");
        }}
      />
    </div>
  );
};
