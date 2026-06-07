import {
  SIDEBAR_CLOSER_ICON_CODE,
  SIDEBAR_OPENER_ICON_CODE,
} from "#/features/companies/constants/sidebar.constants";
import { GoogleIcon } from "#/ui/GoogleIcon/GoogleIcon";
import React from "react";
import type { SidebarState } from "#/types/internal/sidebar/sidebar-types";
import { useCompanyName } from "#/features/companies/components/Sidebar/hooks/useCompanyName";

type SidebarTogglerProps = {
  sidebarState: SidebarState;
  setSidebarState: React.Dispatch<React.SetStateAction<SidebarState>>;
  sidebarLabel: string;
  setSidebarLabel: React.Dispatch<React.SetStateAction<string>>;
};

export const SidebarToggler: React.FC<SidebarTogglerProps> = ({
  sidebarState,
  setSidebarState,
  sidebarLabel,
  setSidebarLabel,
}) => {
  const companyName = useCompanyName();

  return (
    <div className="w-full flex items-center justify-between px-[0.7rem]">
      {sidebarState === "open" && (
        <p className={`pl-1 font-light tracking-wide`}>{companyName}</p>
      )}
      <div
        className="hover:bg-gray-200 rounded-[0.5rem] w-8 h-8 hover:cursor-pointer"
        onClick={() => {
          setSidebarState((prev) => (prev === "open" ? "closed" : "open"));
          setSidebarLabel((prev) =>
            prev === SIDEBAR_OPENER_ICON_CODE
              ? SIDEBAR_CLOSER_ICON_CODE
              : SIDEBAR_OPENER_ICON_CODE,
          );
        }}
      >
        <GoogleIcon code={sidebarLabel} size={2} weight={200} />
      </div>
    </div>
  );
};
