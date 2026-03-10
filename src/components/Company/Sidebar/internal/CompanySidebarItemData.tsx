import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  SYSTEM_FONT_BOLD,
  SYSTEM_FONT_NORMAL,
} from "../../../../tailwind/tailwind-font-vars.ts";
import type { SidebarState } from "../../../../types/internal/sidebar/sidebar-types.ts";
import { BLANK_STRING } from "../../../../constants/common/global-constants.ts";
import { Z_INDEX_NORMAL_PRECEDENCE } from "../../../../tailwind/tailwind-layout-vars.ts";

export const CompanySidebarItemData: React.FC<{
  label: string;
  sidebarState: SidebarState;
  route?: string;
  img?: string;
}> = ({ label, sidebarState, route, img }) => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <div
      className="relative flex flex-row items-center pl-2 gap-x-3 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        if (!isClicked) {
          setIsHovered(false);
        }
      }}
      onClick={() => {
        setIsClicked((prev) => !prev);
        if (route) {
          navigate(route);
        }
      }}
    >
      {img && (
        <img
          className={`w-8 h-8 ${sidebarState === "closed" ? "hover:bg-gray-200 rounded-[0.5rem]" : BLANK_STRING}`}
          src={img}
          alt="img-icon"
        />
      )}
      {sidebarState === "closed" && isHovered && (
        <p
          className={`ml-[0.6rem] px-2 text-[0.8rem] ${Z_INDEX_NORMAL_PRECEDENCE} bg-black text-white ${SYSTEM_FONT_NORMAL} tracking-wide rounded-[0.2rem] inline-block whitespace-nowrap`}
        >
          {label}
        </p>
      )}
      {sidebarState === "open" && (
        <p
          className={`text-[0.8rem] text-black ${isHovered ? SYSTEM_FONT_BOLD : SYSTEM_FONT_NORMAL} tracking-wide`}
        >
          {label}
        </p>
      )}
    </div>
  );
};
