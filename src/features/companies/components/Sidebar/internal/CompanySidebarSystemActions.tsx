import { SidebarItem } from "#/features/companies/components/Sidebar/internal/SidebarItem";
import {
  COMPANIES_ICON_CODE,
  LOGOUT_ICON_CODE,
  SETTINGS_ICON_CODE,
} from "#/features/companies/constants/sidebar.constants";
import { COMPANIES_LIST, LANDING, SETTINGS } from "#/shared/routes/routes";
import React from "react";
import type { SidebarState } from "#/types/internal/sidebar/sidebar-types";

type CompanySidebarOperationalOptionsProps = {
  sidebarState: SidebarState;
  baseRoute: string;
};

export const CompanySidebarSystemActions: React.FC<
  CompanySidebarOperationalOptionsProps
> = ({ sidebarState, baseRoute }) => {
  return (
    <div>
      <SidebarItem
        label="Companies"
        iconCode={COMPANIES_ICON_CODE}
        route={COMPANIES_LIST}
        sidebarState={sidebarState}
      />
      <SidebarItem
        label="Settings"
        iconCode={SETTINGS_ICON_CODE}
        route={`${baseRoute}${SETTINGS}`}
        sidebarState={sidebarState}
      />
      <SidebarItem
        label="Log Out"
        iconCode={LOGOUT_ICON_CODE}
        route={LANDING}
        sidebarState={sidebarState}
      />
    </div>
  );
};
