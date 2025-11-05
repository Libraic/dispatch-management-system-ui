import { useEffect, useState } from "react";
import { fetchCompanies } from "../../../../service/companyService.ts";
import { useNavigate } from "react-router-dom";
import { LANDING } from "../../../../constants/route/internal-route-constants.ts";
import {
  getNameInitials,
  getPropertySafe,
  getSpentDays,
} from "../../../../utils/company/companies-list-utils.ts";
import { BackButton } from "../../../atoms/Button/BackButton.tsx";
import type { CompanyData } from "../../../../types/api/company/company-api-response-types.ts";
import { HOVER_BACKGROUND_NORMAL_COLOR } from "../../../../tailwind/tailwind-colors-vars.ts";

export const CompaniesPage = () => {
  const [companies, setCompanies] = useState<CompanyData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanies().then((data) => {
      if (data) {
        setCompanies(data);
      }
    });
  }, []);

  const columnsLayout = "grid-cols-[10%_15%_30%_15%_15%_15%]";

  return (
    <div className="w-screen flex flex-col items-center mt-10">
      <BackButton url={LANDING} />
      <div
        className={`w-[80%] h-[2.5rem] grid ${columnsLayout} text-left bg-[#ebebeb] font-open-sans font-regular rounded-[0.3rem] px-[3rem] mt-6`}
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

      {companies.map((company, index) => (
        <div
          className={`w-[80%] h-[3.5rem] grid ${columnsLayout} hover:cursor-pointer hover:text-white ${HOVER_BACKGROUND_NORMAL_COLOR} text-left font-lato font-light px-[3rem] rounded-[0.3rem] even:bg-[#f6f6f6]`}
          key={index}
          onClick={() =>
            navigate(`/dashboard/${encodeURIComponent(company.uuid)}`)
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
