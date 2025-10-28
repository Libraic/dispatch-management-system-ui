import { Option } from "../../molecules/Option/Option.tsx";
import {
  COMPANIES_LIST,
  COMPANY_REGISTRATION,
  USER_REGISTRATION,
} from "../../../constants/route/internal-route-constants.ts";

import createUserUnhoveredIcon from "../../../assets/admin-menu/create-user-unhovered.svg";
import createUserHoveredIcon from "../../../assets/admin-menu/create-user-hovered.svg";
import createCompanyUnhoveredIcon from "../../../assets/admin-menu/create-company-unhovered.svg";
import createCompanyHoveredIcon from "../../../assets/admin-menu/create-company-hovered.svg";
import listCompaniesUnhoveredIcon from "../../../assets/admin-menu/list-companies-unhovered.svg";
import listCompaniesHoveredIcon from "../../../assets/admin-menu/list-companies-hovered.svg";

export const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-5">
      <Option
        unhoveredIcon={createUserUnhoveredIcon}
        hoveredIcon={createUserHoveredIcon}
        header="AddButton Employee"
        description="AddButton a new employee to the system"
        bgColor="bg-[#e6eaff]"
        navigateTo={USER_REGISTRATION}
      />
      <Option
        unhoveredIcon={createCompanyUnhoveredIcon}
        hoveredIcon={createCompanyHoveredIcon}
        header="AddButton Company"
        description="AddButton a new company to the system"
        bgColor="bg-[#fee2e7]"
        navigateTo={COMPANY_REGISTRATION}
      />
      <Option
        unhoveredIcon={listCompaniesUnhoveredIcon}
        hoveredIcon={listCompaniesHoveredIcon}
        header="List Companies"
        description="Display all the companies shared with the User"
        bgColor="bg-[#fee2e7]"
        navigateTo={COMPANIES_LIST}
      />
    </div>
  );
};
