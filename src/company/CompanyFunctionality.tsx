import * as React from "react";

export const CompanyFunctionality: React.FC<{
  label: string;
  icon: string;
}> = ({ label, icon }) => {
  return (
    <div className="pl-2 mt-5 flex flex-row items-center gap-x-3 cursor-pointer hover:bg-light-blue">
      <img className="w-8 h-8" src={icon} alt="trucks-board-icon" />
      <p className="text-[0.8rem] text-white font-open-sans font-light">
        {label}
      </p>
    </div>
  );
};
