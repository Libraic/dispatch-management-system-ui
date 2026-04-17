import {
  BACKGROUND_PALE_BLUE,
  HOVER_BACKGROUND_PALE_BLUE,
} from "#/tailwind/tailwind-colors-vars";
import * as React from "react";

type CalendarExpanderDropdownListProps = {
  isExpanded: boolean;
  selectedValue: string;
  data: string[];
  onClick: (value: string) => void;
};

export const CalendarExpanderDropdownList: React.FC<
  CalendarExpanderDropdownListProps
> = ({ isExpanded, selectedValue, data, onClick }) => {
  return (
    isExpanded && (
      <div className="absolute bg-white/20 backdrop-blur-lg z-10000 left-0 top-full mt-1 pt-29 flex flex-col items-center justify-center w-[5.8rem] overflow-y-auto max-h-43 border-1 rounded-[0.25rem] border-gray-200 text-[0.8rem] gap-y-[0.3rem]">
        {data.map((value, index) => (
          <div
            key={index}
            className={`cursor-pointer ${HOVER_BACKGROUND_PALE_BLUE} ${value === selectedValue && BACKGROUND_PALE_BLUE} rounded-[0.25rem] px-2`}
            onClick={() => onClick(value)}
          >
            {value}
          </div>
        ))}
      </div>
    )
  );
};
