import type { ReactNode } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { colorTransitionStyle } from "../utils/tailwind.ts";

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
  const [borderColor, setBorderColor] = React.useState("border-light-grey");
  const navigate = useNavigate();
  return (
    <div
      className={`flex flex-row items-center gap-x-5 w-[25rem] border-2 ${borderColor} rounded-xl p-2 ${colorTransitionStyle}`}
    >
      <div
        className={`flex justify-center ${bgColor} rounded-xl w-[3.3rem] h-[3rem]`}
      >
        <div
          className="w-fit h-fit hover:cursor-pointer"
          onMouseEnter={() => {
            setIcon(focusedIcon);
            setBorderColor("border-light-blue");
          }}
          onMouseLeave={() => {
            setIcon(unfocusedIcon);
            setBorderColor("border-light-grey");
          }}
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
