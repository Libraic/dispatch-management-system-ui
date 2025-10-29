import { useNavigate } from "react-router-dom";
import { HOME } from "../../../constants/route/internal-route-constants.ts";
import { Gradient } from "../../atoms/Gradient/Gradient.tsx";

export const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-y-[1rem]">
      <Gradient />
      <div className="flex flex-col items-center text-white">
        <p className="font-roboto font-bold text-[1.5rem]">
          Dispatch Management System
        </p>
        <p className="font-roboto font-thin text-[1.25rem]">Powered by Kovin</p>
      </div>
      <div
        className="font-roboto font-bold text-[1.5rem] text-white border-1 border-white p-2 hover:cursor-pointer"
        onClick={() => navigate(HOME)}
      >
        Get Started
      </div>
    </div>
  );
};
