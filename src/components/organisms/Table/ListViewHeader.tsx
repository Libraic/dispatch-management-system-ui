import addIcon from "../../../assets/global/add-no-border.svg";
import { useNavigate } from "react-router-dom";
import * as React from "react";

export const ListViewHeader: React.FC<{
  companyUuid: string;
  viewTitle: string;
  viewDescription: string;
  viewIcon: string;
  buttonSubroute: string;
  buttonLabel: string;
}> = ({
  companyUuid,
  viewTitle,
  viewDescription,
  viewIcon,
  buttonSubroute,
  buttonLabel,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between flex-row w-[95%] mx-[2.5rem]">
      <div className="flex flex-row items-center gap-x-[0.25rem]">
        <img className="w-25 h-25" src={viewIcon} alt="view-icon" />
        <div className="flex flex-col">
          <p className="font-open-sans font-bold text-[1.5rem]">{viewTitle}</p>
          <p className="font-open-sans font-thin text-[0.9rem] text-solid-black">
            {viewDescription}
          </p>
        </div>
      </div>
      <div
        onClick={() => navigate(`/dashboard/${companyUuid}${buttonSubroute}`)}
        className="flex flex-row items-center font-lato font-normal px-3 py-1 rounded-[0.25rem] hover:cursor-pointer bg-light-blue hover:bg-solid-blue text-white text-[0.85rem] hover:border-none gap-x-[0.5rem]"
      >
        <img className="w-6 h-6" src={addIcon} alt="add-icon" />
        <p>{buttonLabel}</p>
      </div>
    </div>
  );
};
