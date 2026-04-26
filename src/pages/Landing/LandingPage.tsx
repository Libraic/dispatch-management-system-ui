import { useNavigate } from "react-router-dom";
import { HOME } from "#/shared/routes/routes";
import { Gradient } from "#/ui/Gradient/Gradient";
import { BORDER_SOLID_COLOR } from "#/shared/constants/tailwind/tailwindColors.constants";

export const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-y-[1rem]">
      <Gradient />
      <div className="flex flex-col items-center text-white">
        <p className={`font-bold text-[2rem]`}>Dispatch Management System</p>
        <p className={`font-thin text-[1.25rem]`}>Powered by Kovin Group</p>
      </div>
      <div className="flex flex-row gap-x-[2rem] pt-5">
        <div
          className={`flex items-center justify-center font-normal text-[0.9rem] text-black border-1 border-white bg-white rounded-[1.2rem] px-2 py-1 hover:cursor-pointer w-[8.75rem] h-[2.7rem]`}
          onClick={() => navigate(HOME)}
        >
          Get Started
        </div>
        <div
          className={`flex items-center justify-center font-normal text-[0.9rem] text-white border-1 ${BORDER_SOLID_COLOR} bg-[#171517] rounded-[1.2rem] px-2 py-1 hover:cursor-pointer w-[8.75rem] h-[2.7rem]`}
          onClick={() => navigate(HOME)}
        >
          Book a Demo
        </div>
      </div>
    </div>
  );
};
