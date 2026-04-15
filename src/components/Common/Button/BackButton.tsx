import * as React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleIcon } from "../../../shared/components/GoogleIcon/GoogleIcon.tsx";

export const BackButton: React.FC<{ url: string; action?: () => void }> = ({
  url,
  action,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="absolute top-5 left-5 border-2 border-solid-black rounded-[50%] hover:cursor-pointer hover:bg-solid-black"
      onClick={() => {
        if (action) {
          action();
        } else {
          navigate(url);
        }
      }}
    >
      <div className="flex items-center justify-center text-[#212327] hover:text-white">
        <GoogleIcon code="arrow_back" size={1.5} />
      </div>
    </div>
  );
};
