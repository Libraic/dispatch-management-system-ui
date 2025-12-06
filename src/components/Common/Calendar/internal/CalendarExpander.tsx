import chevronDownIcon from "../../../../assets/week-picker/chevron-down.svg";
import chevronUpIcon from "../../../../assets/week-picker/chevron-up.svg";
import chevronDownIconHovered from "../../../../assets/week-picker/chevron-down-hovered.svg";
import chevronUpIconHovered from "../../../../assets/week-picker/chevron-up-hovered.svg";
import * as React from "react";
import { useState } from "react";
import { CalendarExpanderDropdownList } from "./CalendarExpanderDropdownList.tsx";
import { useOnClickOutside } from "../../../../hooks/useClickOutside.ts";

export const CalendarExpander: React.FC<{
  data: string[];
  selected: string;
  expanderRef: React.RefObject<HTMLDivElement | null>;
  onClick: (value: string) => void;
}> = ({ data, selected, expanderRef, onClick }) => {
  const [activeIcon, setActiveIcon] = useState(chevronDownIcon);
  const [isExpanded, setIsExpanded] = useState(false);
  useOnClickOutside(expanderRef, () => {
    setActiveIcon(chevronDownIcon);
    setIsExpanded(false);
  });
  return (
    <div className="relative flex items-center" ref={expanderRef}>
      <img
        src={activeIcon}
        onMouseEnter={() =>
          setActiveIcon(
            isExpanded ? chevronUpIconHovered : chevronDownIconHovered,
          )
        }
        onMouseLeave={() =>
          setActiveIcon(isExpanded ? chevronUpIcon : chevronDownIcon)
        }
        onClick={() => {
          setActiveIcon(isExpanded ? chevronDownIcon : chevronUpIcon);
          setIsExpanded((prev) => !prev);
        }}
        alt="chevron-down"
        className="w-[1.5rem] pt-[0.25rem] hover:cursor-pointer"
      />
      <CalendarExpanderDropdownList
        isExpanded={isExpanded}
        selectedValue={selected}
        data={data}
        onClick={(value) => {
          onClick(value);
          setIsExpanded(false);
          setActiveIcon(chevronDownIcon);
        }}
      />
    </div>
  );
};
