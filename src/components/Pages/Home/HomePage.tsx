import { Option } from "../../Home/Option.tsx";
import {
  COMPANIES_LIST,
  COMPANY_REGISTRATION,
} from "../../../constants/route/internal-route-constants.ts";
import { GoogleIcon } from "../../../shared/components/GoogleIcon/GoogleIcon.tsx";

export const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-5">
      <Option
        icon={<GoogleIcon code="add_business" />}
        header="Add Company"
        description="Add a new company to the system"
        navigateTo={COMPANY_REGISTRATION}
      />
      <Option
        icon={<GoogleIcon code="table_rows" />}
        header="List Companies"
        description="Display all the companies shared with the User"
        navigateTo={COMPANIES_LIST}
      />
    </div>
  );
};
