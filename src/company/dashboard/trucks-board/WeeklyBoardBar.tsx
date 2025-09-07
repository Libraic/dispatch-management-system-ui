import * as React from "react";

export const WeeklyBoardBar: React.FC<{ interval: string }> = ({
  interval,
}) => {
  return (
    <div className="relative group">
      <div
        className="
          relative flex items-center justify-center font-open-sans font-bold hover:cursor-pointer
          overflow-hidden w-[200px] h-[40px] bg-[#d4ddf8] group-hover:bg-[#b2c2f2]
          rounded-tl-[20px] rounded-tr-[30px]
          before:content-[''] before:absolute before:left-0 before:bottom-0
          before:w-[20px] before:aspect-square before:bg-[#d4ddf8] group-hover:before:bg-[#b2c2f2]
          before:[transform:skew(-40deg)] before:origin-bottom-left
          before:[-webkit-mask:radial-gradient(120%_122%_at_0_0,#0000_97%,#000)]
          before:[mask:radial-gradient(100%_102%_at_0_0,#0000_97%,#000)]
          after:content-[''] after:absolute after:right-0 after:bottom-0
          after:w-[20px] after:aspect-square after:bg-[#d4ddf8] group-hover:after:bg-[#b2c2f2]
          after:[transform:skew(40deg)] after:origin-bottom-right
          after:[-webkit-mask:radial-gradient(100%_102%_at_100%_0,#0000_97%,#000)]
          after:[mask:radial-gradient(100%_102%_at_100%_0,#0000_97%,#000)]
        "
      >
        {interval}
      </div>
    </div>
  );
};
