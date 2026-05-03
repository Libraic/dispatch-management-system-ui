import { CompanySidebarItem } from "#/features/companies/components/Sidebar/internal/CompanySidebarItem";
import {
  LOGOUT_ICON_CODE,
  SETTINGS_ICON_CODE,
} from "#/features/companies/constants/sidebar.constants";
import { LANDING, SETTINGS } from "#/shared/routes/routes";
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
      <CompanySidebarItem
        label="Log Out"
        iconCode={LOGOUT_ICON_CODE}
        route={LANDING}
        sidebarState={sidebarState}
      />
      <CompanySidebarItem
        label="Settings"
        iconCode={SETTINGS_ICON_CODE}
        route={`${baseRoute}${SETTINGS}`}
        sidebarState={sidebarState}
      />
    </div>
  );
};
