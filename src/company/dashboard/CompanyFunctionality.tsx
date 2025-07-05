import * as React from "react";
import { useNavigate } from "react-router-dom";

export const CompanyFunctionality: React.FC<{
  label: string;
  icon: string;
  route: string;
}> = ({ label, icon, route }) => {
  const navigate = useNavigate();
  return (
    <div
      className="pl-2 mt-5 flex flex-row items-center gap-x-3 cursor-pointer hover:bg-light-blue"
      onClick={() => navigate(route)}
    >
      <img className="w-8 h-8" src={icon} alt="trucks-board-icon" />
      <p className="text-[0.8rem] text-white font-open-sans font-normal">
        {label}
      </p>
    </div>
  );
};
