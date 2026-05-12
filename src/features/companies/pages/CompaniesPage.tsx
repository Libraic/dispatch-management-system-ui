import { useNavigate } from "react-router-dom";
import { DASHBOARD } from "#/shared/routes/routes";
import {
  getNameInitials,
  getPropertySafe,
  getSpentDays,
} from "#/utils/company/companies-list-utils";
import { HomeButton } from "#/features/companies/components/Companies/HomeButton";
import { HOVER_BACKGROUND_NORMAL_COLOR } from "#/shared/constants/tailwind/tailwindColors.constants";
import { getCompanies } from "#/features/companies/api/companies.api";
import { usePage } from "#/shared/hooks/usePage";
import type { CompanyData } from "#/types/api/company/company-api-response-types";

export const CompaniesPage = () => {
  const navigate = useNavigate();
  const { data } = usePage<CompanyData>(getCompanies);

  const columnsLayout = "grid-cols-[10%_15%_30%_15%_15%_15%]";

  return (
    <div className="w-screen flex flex-col items-center mt-10">
      <HomeButton />
      <div
        className={`w-[80%] h-[2.5rem] grid ${columnsLayout} text-left bg-[#ebebeb] font-normal rounded-[0.3rem] px-[3rem] mt-6`}
      >
        <div className="flex items-center">
          <input type="checkbox" className="w-4 h-4 cursor-pointer" />
        </div>
        <div className="flex items-center">MC Number</div>
        <div className="flex items-center">Name</div>
        <div className="flex items-center">Address</div>
        <div className="flex items-center">Start Date</div>
        <div className="flex items-center">Spent</div>
      </div>

      {data.content.map((company, index) => (
        <div
          className={`w-[80%] h-[3.5rem] grid ${columnsLayout} hover:cursor-pointer hover:text-white ${HOVER_BACKGROUND_NORMAL_COLOR} text-left font-light px-[3rem] rounded-[0.3rem] even:bg-[#f6f6f6]`}
          key={index}
          onClick={() =>
            navigate(`/${encodeURIComponent(company.uuid)}${DASHBOARD}`)
          }
        >
          <div className="flex items-center">
            <input type="checkbox" className="w-4 h-4 hover:cursor-pointer" />
          </div>
          <div className="flex items-center">
            {getPropertySafe(company.mcNumber)}
          </div>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-solid-black rounded-[50%] mr-3 flex items-center justify-center">
              <p className="text-white text-[1.2rem]">
                {getNameInitials(company.name)}
              </p>
            </div>
            <p>{company.name}</p>
          </div>
          <div className="flex items-center">
            {getPropertySafe(company.address)}
          </div>
          <div className="flex items-center">{company.startDate}</div>
          <div className="flex items-center">
            {getSpentDays(company.startDate)}
          </div>
        </div>
      ))}
    </div>
  );
};
