import { CompanySidebarHeader } from "../../../molecules/Company/Sidebar/CompanySidebarHeader.tsx";
import { BLANK_STRING } from "../../../../constants/common/global-constants.ts";
import { CompanySidebarItem } from "./CompanySidebarItem.tsx";
import trucksBoardUnhoveredIcon from "../../../../assets/company-menu/trucks-board-unhovered.svg";
import {
  DRIVERS_VIEW,
  TRAILERS_VIEW,
  TRUCKS_BOARD,
  TRUCKS_VIEW,
} from "../../../../constants/route/internal-route-constants.ts";
import addDriverIcon from "../../../../assets/company-menu/add-driver.svg";
import addAssetIcon from "../../../../assets/company-menu/add-asset-icon.svg";
import { useParams } from "react-router-dom";
import * as React from "react";
import type { CompanyData } from "../../../../types/api/company/company-api-response-types.ts";

export const CompanySidebar: React.FC<{ company: CompanyData }> = ({
  company,
}) => {
  const { companyUuid } = useParams();
  const baseRoute = `/dashboard/${companyUuid}`;
  return (
    <div className="w-1/10 bg-solid-black py-5">
      <CompanySidebarHeader
        companyName={company ? company.name : BLANK_STRING}
      />
      <CompanySidebarItem
        label="Trucks Board"
        icon={trucksBoardUnhoveredIcon}
        baseRoute={`${baseRoute}${TRUCKS_BOARD}`}
      />
      <CompanySidebarItem
        label="Drivers"
        icon={addDriverIcon}
        baseRoute={`${baseRoute}${DRIVERS_VIEW}`}
      />
      <CompanySidebarItem
        label="Assets"
        icon={addAssetIcon}
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
    </div>
  );
};
