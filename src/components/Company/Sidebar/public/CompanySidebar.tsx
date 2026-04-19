import { CompanySidebarItem } from "#/components/Company/Sidebar/internal/CompanySidebarItem";
import {
  DISPATCHERS_VIEW,
  DRIVERS_VIEW,
  PLANNER,
  TRAILERS_VIEW,
  TRUCKS_VIEW,
} from "#/constants/route/internal-route-constants";
import { useParams } from "react-router-dom";
import * as React from "react";
import { useState } from "react";
import type { SidebarState } from "#/types/internal/sidebar/sidebar-types";
import { GoogleIcon } from "#/ui/GoogleIcon/GoogleIcon";
import {
  ASSETS_ICON_CODE,
  DASHBOARD_ICON_CODE,
  DISPATCHERS_ICON_CODE,
  DRIVERS_ICON_CODE,
  PLANNER_ICON_CODE,
  SIDEBAR_CLOSER_ICON_CODE,
  SIDEBAR_OPENER_ICON_CODE,
} from "#/features/companies/constants/ui.constants";

export const CompanySidebar: React.FC<{
  sidebarState: SidebarState;
  setSidebarState: React.Dispatch<React.SetStateAction<SidebarState>>;
}> = ({ sidebarState, setSidebarState }) => {
  const { companyUuid } = useParams();
  const baseRoute = `/dashboard/${companyUuid}`;
  const [sidebarLabel, setSidebarLabel] = useState(SIDEBAR_OPENER_ICON_CODE);
  return (
    <div
      className={`${sidebarState === "open" ? "w-[12rem]" : "w-[4rem]"} py-5 border-r-1 border-gray-200 bg-[#f9f9f9] h-screen`}
    >
      <div className="w-full flex items-center justify-between px-[0.7rem]">
        {sidebarState === "open" && (
          <p className={`pl-1 font-light tracking-wide`}>Kovin Group</p>
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
      <CompanySidebarItem
        label="Dashboard"
        iconCode={DASHBOARD_ICON_CODE}
        baseRoute={baseRoute}
        sidebarState={sidebarState}
      />
      <CompanySidebarItem
        label="Planner"
        iconCode={PLANNER_ICON_CODE}
        baseRoute={`${baseRoute}${PLANNER}`}
        sidebarState={sidebarState}
      />
      <CompanySidebarItem
        label="Drivers"
        iconCode={DRIVERS_ICON_CODE}
        baseRoute={`${baseRoute}${DRIVERS_VIEW}`}
        sidebarState={sidebarState}
      />
      <CompanySidebarItem
        label="Dispatchers"
        iconCode={DISPATCHERS_ICON_CODE}
        baseRoute={`${baseRoute}${DISPATCHERS_VIEW}`}
        sidebarState={sidebarState}
      />
      {sidebarState === "open" && (
        <CompanySidebarItem
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
