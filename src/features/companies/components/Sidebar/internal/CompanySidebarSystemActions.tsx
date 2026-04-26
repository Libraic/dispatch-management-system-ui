import { CompanySidebarItem } from "#/features/companies/components/Sidebar/internal/CompanySidebarItem";
import { SETTINGS_ICON_CODE } from "#/features/companies/constants/sidebar.constants";
import { SETTINGS } from "#/shared/routes/routes";
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
        label="Settings"
        iconCode={SETTINGS_ICON_CODE}
        route={`${baseRoute}${SETTINGS}`}
        sidebarState={sidebarState}
      />
    </div>
  );
};
