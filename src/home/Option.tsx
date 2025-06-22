import type { ReactNode } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";

export const Option: React.FC<{
  unfocusedIcon: ReactNode;
  focusedIcon: ReactNode;
  header: string;
  description: string;
  bgColor: string;
  navigateTo: string;
}> = ({
  unfocusedIcon,
  focusedIcon,
  header,
  description,
  bgColor,
  navigateTo,
}) => {
  const [icon, setIcon] = React.useState(unfocusedIcon);
  const navigate = useNavigate();
  return (
    <div className="flex flex-row items-center gap-x-5 w-[25rem] border-2 border-light-grey rounded-xl p-2">
      <div
        className={`flex justify-center ${bgColor} rounded-xl w-[3.3rem] h-[3rem]`}
      >
        <div
          className="w-fit h-fit hover:cursor-pointer"
          onMouseEnter={() => setIcon(focusedIcon)}
          onMouseLeave={() => setIcon(unfocusedIcon)}
          onClick={() => navigate(navigateTo)}
        >
          {icon}
        </div>
      </div>

      <div>
        <p className="text-[1rem] font-lato font-bold">{header}</p>
        <p className="text-standard-size font-lato font-light">{description}</p>
      </div>
    </div>
  );
};
