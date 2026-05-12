import { SidebarItem } from "#/features/companies/components/Sidebar/internal/SidebarItem";
import {
  ASSETS_ICON_CODE,
  DASHBOARD_ICON_CODE,
  DISPATCHERS_ICON_CODE,
  DRIVERS_ICON_CODE,
  PLANNER_ICON_CODE,
} from "#/features/companies/constants/sidebar.constants";
import {
  DASHBOARD,
  DISPATCHERS_VIEW,
  DRIVERS_VIEW,
  PLANNER,
  TRAILERS_VIEW,
  TRUCKS_VIEW,
} from "#/shared/routes/routes";
import { type FC } from "react";
import type { SidebarState } from "#/types/internal/sidebar/sidebar-types";

type CompanySidebarFeaturesProps = {
  sidebarState: SidebarState;
  baseRoute: string;
};

export const SidebarPrimaryActions: FC<CompanySidebarFeaturesProps> = ({
  sidebarState,
  baseRoute,
}) => {
  return (
    <div>
      <SidebarItem
        label="Dashboard"
        iconCode={DASHBOARD_ICON_CODE}
        route={`${baseRoute}${DASHBOARD}`}
        sidebarState={sidebarState}
      />
      <SidebarItem
        label="Planner"
        iconCode={PLANNER_ICON_CODE}
        route={`${baseRoute}${PLANNER}`}
        sidebarState={sidebarState}
      />
      <SidebarItem
        label="Drivers"
        iconCode={DRIVERS_ICON_CODE}
        route={`${baseRoute}${DRIVERS_VIEW}`}
        sidebarState={sidebarState}
      />
      <SidebarItem
        label="Dispatchers"
        iconCode={DISPATCHERS_ICON_CODE}
        route={`${baseRoute}${DISPATCHERS_VIEW}`}
        sidebarState={sidebarState}
      />
      {sidebarState === "open" && (
        <SidebarItem
          label="Assets"
          iconCode={ASSETS_ICON_CODE}
          sidebarState={sidebarState}
          submenuData={[
            {
              label: "Trucks",
              route: `${baseRoute}${TRUCKS_VIEW}`,
            },
            {
              label: "Trailers",
              route: `${baseRoute}${TRAILERS_VIEW}`,
            },
          ]}
        />
      )}
    </div>
  );
};
