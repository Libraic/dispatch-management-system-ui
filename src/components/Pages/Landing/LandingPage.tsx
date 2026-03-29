import { useNavigate } from "react-router-dom";
import { HOME } from "../../../constants/route/internal-route-constants.ts";
import { Gradient } from "../../Common/Gradient/Gradient.tsx";
import { BORDER_SOLID_COLOR } from "../../../tailwind/tailwind-colors-vars.ts";
import {
  SYSTEM_FONT_BOLD,
  SYSTEM_FONT_NORMAL,
  SYSTEM_FONT_THIN,
} from "../../../tailwind/tailwind-font-vars.ts";

export const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-y-[1rem]">
      <Gradient />
      <div className="flex flex-col items-center text-white">
        <p className={`${SYSTEM_FONT_BOLD} text-[2rem]`}>
          Dispatch Management System
        </p>
        <p className={`${SYSTEM_FONT_THIN} text-[1.25rem]`}>
          Powered by Kovin Group
        </p>
      </div>
      <div className="flex flex-row gap-x-[2rem] pt-5">
        <div
          className={`flex items-center justify-center ${SYSTEM_FONT_NORMAL} text-[0.9rem] text-black border-1 border-white bg-white rounded-[1.2rem] px-2 py-1 hover:cursor-pointer w-[8.75rem] h-[2.7rem]`}
          onClick={() => navigate(HOME)}
        >
          Get Started
        </div>
        <div
          className={`flex items-center justify-center ${SYSTEM_FONT_NORMAL} text-[0.9rem] text-white border-1 ${BORDER_SOLID_COLOR} bg-[#171517] rounded-[1.2rem] px-2 py-1 hover:cursor-pointer w-[8.75rem] h-[2.7rem]`}
          onClick={() => navigate(HOME)}
        >
          Book a Demo
        </div>
      </div>
    </div>
  );
};
