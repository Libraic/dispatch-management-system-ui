import * as React from "react";
import { useNavigate } from "react-router-dom";

export const TableNavigableButton: React.FC<{
  navigationAddress: string;
  label: string;
  icon: string;
}> = ({ navigationAddress, label, icon }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(navigationAddress)}
      className="flex flex-row items-center font-lato font-normal px-3 py-1 rounded-[0.25rem] hover:cursor-pointer bg-light-blue hover:bg-solid-blue text-white text-[0.85rem] hover:border-none gap-x-[0.5rem]"
    >
      <img className="w-6 h-6" src={icon} alt="table-icon" />
      <p>{label}</p>
    </div>
  );
};
