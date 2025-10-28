import * as React from "react";
import { useEffect, useState } from "react";
import { DEFAULT_SIZE } from "../../../constants/api/api-query-constants.ts";

import previousIcon from "../../../assets/global/previous.svg";
import nextIcon from "../../../assets/global/next.svg";
import previousIconFocused from "../../../assets/global/previous-focused.svg";
import nextIconFocused from "../../../assets/global/next-focused.svg";
import {
  PageableEntity,
  type PaginationData,
} from "../../../types/api/common/api-query-types.ts";
import { getPaginationDetails } from "../../../service/paginationService.ts";

export const PaginationDetails: React.FC<{
  joinableEntityId: string;
  entityType: PageableEntity;
  fetchFn: (pageNumber: number) => void;
}> = ({ joinableEntityId, entityType, fetchFn }) => {
  const [paginationDetails, setPaginationDetails] = useState<PaginationData>({
    pages: 0,
    size: DEFAULT_SIZE,
  });
  const [activePreviousIcon, setActivePreviousIcon] = useState(previousIcon);
  const [activeNextIcon, setActiveNextIcon] = useState(nextIcon);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    getPaginationDetails(joinableEntityId, entityType).then((data) => {
      setPaginationDetails(data);
    });
  }, [joinableEntityId, entityType]);
  return (
    <div className="flex items-center justify-between mx-[2.7rem]">
      <div className="border-[0.1rem] rounded-[0.2rem] border-[#cccccc] px-2 font-bold font-roboto text-[0.9rem] text-solid-black">
        {paginationDetails.size} Records
      </div>
      <div className="flex flex-row items-center gap-x-3">
        {Array.from({ length: paginationDetails.pages }, (_, index) => (
          <div
            key={index}
            onClick={() => {
              if (activePage !== index + 1) {
                setActivePage(index + 1);
                fetchFn(index);
              }
            }}
            className={`border-[#cccccc] px-2 py-[0.1rem] rounded-[0.2rem] text-[0.9rem] text-[#808588] hover:cursor-pointer hover:bg-solid-black hover:text-white ${activePage === index + 1 && "bg-solid-black text-white"}`}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <div className="flex flex-row gap-x-4 items-center">
        <div
          onMouseEnter={() => setActivePreviousIcon(previousIconFocused)}
          onMouseLeave={() => setActivePreviousIcon(previousIcon)}
          onClick={() =>
            setActivePage((prev) => {
              const page = prev > 1 ? prev - 1 : prev;
              if (page !== activePage) {
                fetchFn(page - 1);
              }
              return page;
            })
          }
          className="flex flex-row items-center justify-center gap-x-1 border-[0.09rem] rounded-[0.2rem] border-[#cccccc] px-2 py-1 w-[6rem] text-[#808588] hover:cursor-pointer hover:border-solid-black hover:bg-solid-black hover:text-white"
        >
          <img
            className="w-4 h-4"
            src={activePreviousIcon}
            alt="previous-icon"
          />
          <p className="text-[0.8rem] font-lato">Previous</p>
        </div>
        <div
          onMouseEnter={() => setActiveNextIcon(nextIconFocused)}
          onMouseLeave={() => setActiveNextIcon(nextIcon)}
          onClick={() =>
            setActivePage((prev) => {
              const page = prev < paginationDetails.pages ? prev + 1 : prev;
              if (page !== activePage) {
                fetchFn(page - 1);
              }
              return page;
            })
          }
          className="flex flex-row items-center justify-center gap-x-1 border-[0.09rem] rounded-[0.2rem] border-[#cccccc] px-2 py-1 w-[6rem] text-[#808588] hover:cursor-pointer hover:border-solid-black hover:bg-solid-black hover:text-white"
        >
          <p className="text-[0.8rem] font-lato">Next</p>
          <img className="w-4 h-4" src={activeNextIcon} alt="next-icon" />
        </div>
      </div>
    </div>
  );
};
