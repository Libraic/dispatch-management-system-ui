import * as React from "react";
import { useNavigate } from "react-router-dom";
import { colorTransitionStyle } from "../utils/tailwind.ts";

export const Option: React.FC<{
  unhoveredIcon: string;
  hoveredIcon: string;
  header: string;
  description: string;
  bgColor: string;
  navigateTo: string;
}> = ({
  unhoveredIcon,
  hoveredIcon,
  header,
  description,
  bgColor,
  navigateTo,
}) => {
  const [icon, setIcon] = React.useState(unhoveredIcon);
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
          className="hover:cursor-pointer flex items-center justify-center"
          onMouseEnter={() => {
            setIcon(hoveredIcon);
            setBorderColor("border-light-blue");
          }}
          onMouseLeave={() => {
            setIcon(unhoveredIcon);
            setBorderColor("border-light-grey");
          }}
          onClick={() => navigate(navigateTo)}
        >
          <img className="w-11 h-11" src={icon} alt="icon" />
        </div>
      </div>
      <div>
        <p className="text-[1rem] font-lato font-bold">{header}</p>
        <p className="text-standard-size font-lato font-light">{description}</p>
      </div>
    </div>
  );
};
