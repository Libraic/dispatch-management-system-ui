import * as React from "react";
import { useNavigate } from "react-router-dom";
import type { SidebarState } from "#/types/internal/sidebar/sidebar-types";
import { Z_INDEX_NORMAL_PRECEDENCE } from "#/shared/constants/tailwind/tailwindLayout.constants";
import { GoogleIcon } from "#/ui/GoogleIcon/GoogleIcon";

type CompanySidebarItemDataProps = {
  label: string;
  sidebarState: SidebarState;
  hasSubmenu: boolean;
  route?: string;
  iconCode?: string;
};

export const CompanySidebarItemData: React.FC<CompanySidebarItemDataProps> = ({
  label,
  sidebarState,
  hasSubmenu,
  route,
  iconCode,
}) => {
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
          className={`ml-[0.6rem] px-2 text-[0.8rem] ${Z_INDEX_NORMAL_PRECEDENCE} bg-black text-white font-normal tracking-wide rounded-[0.2rem] inline-block whitespace-nowrap`}
        >
          {label}
        </p>
      )}
      {sidebarState === "open" && (
        <p
          className={`text-[0.8rem] text-black ${isHovered || isClicked ? "font-bold" : "font-normal"} tracking-wide`}
        >
          {label}
        </p>
      )}
    </div>
  );
};
