import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  SYSTEM_FONT_BOLD,
  SYSTEM_FONT_NORMAL,
} from "../../../../tailwind/tailwind-font-vars.ts";
import type { SidebarState } from "../../../../types/internal/sidebar/sidebar-types.ts";
import { Z_INDEX_NORMAL_PRECEDENCE } from "../../../../tailwind/tailwind-layout-vars.ts";
import { GoogleIcon } from "../../../../shared/components/GoogleIcon/GoogleIcon.tsx";

export const CompanySidebarItemData: React.FC<{
  label: string;
  sidebarState: SidebarState;
  hasSubmenu: boolean;
  route?: string;
  iconCode?: string;
}> = ({ label, sidebarState, hasSubmenu, route, iconCode }) => {
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
        setIsClicked((prev) => (hasSubmenu ? !prev : prev));
        if (route) {
          navigate(route);
        }
      }}
    >
      {iconCode && (
        <div className="hover:bg-gray-200 rounded-[0.5rem]">
          <GoogleIcon code={iconCode} weight={200} size={2} />
        </div>
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
          className={`text-[0.8rem] text-black ${isHovered || isClicked ? SYSTEM_FONT_BOLD : SYSTEM_FONT_NORMAL} tracking-wide`}
        >
          {label}
        </p>
      )}
    </div>
  );
};
