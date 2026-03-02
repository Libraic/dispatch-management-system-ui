import * as React from "react";
import { useNavigate } from "react-router-dom";
import { BORDER_NORMAL_COLOR } from "../../tailwind/tailwind-colors-vars.ts";

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
      className={`flex flex-row items-center gap-x-5 w-[25rem] border-2 ${borderColor} rounded-xl p-2 transition-all ease-in duration-150 hover:cursor-pointer`}
      onMouseEnter={() => {
        setIcon(hoveredIcon);
        setBorderColor(BORDER_NORMAL_COLOR);
      }}
      onMouseLeave={() => {
        setIcon(unhoveredIcon);
        setBorderColor("border-light-grey");
      }}
      onClick={() => navigate(navigateTo)}
    >
      <div
        className={`flex justify-center ${bgColor} rounded-xl w-[3.3rem] h-[3rem]`}
      >
        <div className="flex items-center justify-center">
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
