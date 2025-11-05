import * as React from "react";
import { TEXT_SOLID_GRAY } from "../../../../tailwind/tailwind-colors-vars.ts";

export const TimelineWeek: React.FC<{
  interval: string;
  isActive: boolean;
  setWeek: () => void;
}> = ({ interval, isActive, setWeek }) => {
  const backgroundStyle = isActive
    ? "bg-[#ab8fff] before:bg-[#ab8fff] after:bg-[#ab8fff]"
    : "group-hover:bg-[#ab8fff] group-hover:before:bg-[#ab8fff] group-hover:after:bg-[#ab8fff]";
  return (
    <div className="relative group" onClick={setWeek}>
      <div
        className={`
          relative flex items-center justify-center font-roboto font-normal hover:cursor-pointer ${TEXT_SOLID_GRAY}
          overflow-hidden w-[200px] h-[40px] ${backgroundStyle}
          rounded-tl-[20px] rounded-tr-[30px]
          before:content-[''] before:absolute before:left-0 before:bottom-0
          before:w-[20px] before:aspect-square 
          before:[transform:skew(-40deg)] before:origin-bottom-left
          before:[-webkit-mask:radial-gradient(120%_122%_at_0_0,#0000_97%,#000)]
          before:[mask:radial-gradient(100%_102%_at_0_0,#0000_97%,#000)]
          after:content-[''] after:absolute after:right-0 after:bottom-0
          after:w-[20px] after:aspect-square a
          after:[transform:skew(40deg)] after:origin-bottom-right
          after:[-webkit-mask:radial-gradient(100%_102%_at_100%_0,#0000_97%,#000)]
          after:[mask:radial-gradient(100%_102%_at_100%_0,#0000_97%,#000)]
        `}
      >
        {interval}
      </div>
    </div>
  );
};
