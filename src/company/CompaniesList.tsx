import { useEffect, useState } from "react";
import { fetchCompanies } from "../service/company-service.ts";
import { FETCH_COMPANIES } from "../utils/api/api-paths.ts";
import type { CompanyData } from "../types/api/registration-api.ts";
import backUnhoveredIcon from "../assets/global/back-icon-unhovered.svg";
import backHoveredIcon from "../assets/global/back-icon-hovered.svg";
import { useNavigate } from "react-router-dom";
import { HOME } from "../utils/routes/routes.ts";
import {
  getNameInitials,
  getPropertySafe,
  getSpentDays,
} from "../utils/list/companies-list-utils.ts";

export const CompaniesList = () => {
  const [companies, setCompanies] = useState<CompanyData[]>([]);
  const [backIcon, setBackIcon] = useState(backUnhoveredIcon);
  const navigate = useNavigate();
  useEffect(() => {
    fetchCompanies(FETCH_COMPANIES).then((data) => {
      if (data) {
        setCompanies(data);
      }
    });
  }, []);

  const columnsLayout = "grid-cols-[10%_15%_30%_15%_15%_15%]";

  return (
    <div className="w-screen flex flex-col items-center mt-10">
      <div className="absolute top-5 left-5 border-2 border-solid-black rounded-[50%] hover:cursor-pointer hover:bg-solid-black">
        <img
          src={backIcon}
          alt="back-icon"
          className="w-8 h-8"
          onMouseEnter={() => setBackIcon(backHoveredIcon)}
          onMouseLeave={() => setBackIcon(backUnhoveredIcon)}
          onClick={() => navigate(HOME)}
        />
      </div>
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
          className={`w-[80%] h-[3.5rem] grid ${columnsLayout} hover:cursor-pointer hover:text-white hover:bg-light-blue text-left font-lato font-light px-[3rem] rounded-[0.3rem] ${
            index % 2 === 1 ? "bg-[#f6f6f6]" : "white"
          }`}
          key={index}
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
