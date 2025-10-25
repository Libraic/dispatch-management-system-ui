import * as React from "react";
import { useNavigate } from "react-router-dom";

export const ActionDriver: React.FC<{
  label: string;
  route?: string;
  img?: string;
}> = ({ label, route, img }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-row items-center pl-2 gap-x-3 text-white text-[0.75rem] font-open-sans font-normal"
      onClick={() => {
        if (route) {
          navigate(route);
        }
      }}
    >
      {img && <img className="w-8 h-8" src={img} alt="img-icon" />}
      <p className="text-[0.8rem] text-white font-open-sans font-normal">
        {!img && "• "} {label}
      </p>
    </div>
  );
};
