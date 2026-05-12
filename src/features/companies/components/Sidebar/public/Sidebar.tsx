import { useParams } from "react-router-dom";
import * as React from "react";
import { type FC, useState } from "react";
import type { SidebarState } from "#/types/internal/sidebar/sidebar-types";
import { SIDEBAR_OPENER_ICON_CODE } from "#/features/companies/constants/sidebar.constants";
import { SidebarPrimaryActions } from "#/features/companies/components/Sidebar/internal/SidebarPrimaryActions";
import { CompanySidebarSystemActions } from "#/features/companies/components/Sidebar/internal/CompanySidebarSystemActions";
import { CompanySidebarToggler } from "#/features/companies/components/Sidebar/internal/CompanySidebarToggler";

type SidebarProps = {
  sidebarState: SidebarState;
  setSidebarState: React.Dispatch<React.SetStateAction<SidebarState>>;
};

export const Sidebar: FC<SidebarProps> = ({
  sidebarState,
  setSidebarState,
}) => {
  const { companyUuid } = useParams();
  const baseRoute = `/${companyUuid!!}`;
  const [sidebarLabel, setSidebarLabel] = useState(SIDEBAR_OPENER_ICON_CODE);
  return (
    <div
      className={`
        flex justify-between flex-col 
        ${sidebarState === "open" ? "w-[12rem]" : "w-[4rem]"} 
        py-5 h-screen
        border-r-1 border-gray-200 bg-[#f9f9f9]
      `}
    >
      <div>
        <CompanySidebarToggler
          sidebarState={sidebarState}
          setSidebarState={setSidebarState}
          setSidebarLabel={setSidebarLabel}
          sidebarLabel={sidebarLabel}
        />
        <SidebarPrimaryActions
          sidebarState={sidebarState}
          baseRoute={baseRoute}
        />
      </div>

      <CompanySidebarSystemActions
        sidebarState={sidebarState}
        baseRoute={baseRoute}
      />
    </div>
  );
};
