import backHoveredIcon from "../assets/global/back-icon-hovered.svg";
import backUnhoveredIcon from "../assets/global/back-icon-unhovered.svg";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const BackButton: React.FC<{ url: string; action?: () => void }> = ({
  url,
  action,
}) => {
  const [backIcon, setBackIcon] = useState(backUnhoveredIcon);
  const navigate = useNavigate();
  return (
    <div className="absolute top-5 left-5 border-2 border-solid-black rounded-[50%] hover:cursor-pointer hover:bg-solid-black">
      <img
        src={backIcon}
        alt="back-icon"
        className="w-6 h-6"
        onMouseEnter={() => setBackIcon(backHoveredIcon)}
        onMouseLeave={() => setBackIcon(backUnhoveredIcon)}
        onClick={() => {
          if (action) {
            action();
          } else {
            navigate(url);
          }
        }}
      />
    </div>
  );
};
