import * as React from "react";
import { useNavigate } from "react-router-dom";
import { BORDER_NORMAL_COLOR } from "#/shared/constants/tailwind/tailwindColors.constants";

export const Option: React.FC<{
  icon: React.ReactNode;
  header: string;
  description: string;
  navigateTo: string;
}> = ({ icon, header, description, navigateTo }) => {
  const [borderColor, setBorderColor] = React.useState("border-light-grey");
  const navigate = useNavigate();
  return (
    <div
      className={`flex flex-row items-center gap-x-5 w-[25rem] border-2 ${borderColor} rounded-xl p-2 hover:cursor-pointer`}
      onMouseEnter={() => {
        setBorderColor(BORDER_NORMAL_COLOR);
      }}
      onMouseLeave={() => {
        setBorderColor("border-light-grey");
      }}
      onClick={() => navigate(navigateTo)}
    >
      {icon}
      <div>
        <p className={`text-[1rem] font-bold`}>{header}</p>
        <p className="text-[0.9rem] font-light">{description}</p>
      </div>
    </div>
  );
};
