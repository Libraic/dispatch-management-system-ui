import { useEffect, useState } from "react";
import { fetchCompanies } from "../service/company-service.ts";
import { FETCH_COMPANIES } from "../utils/api/api-paths.ts";
import type { CompanyData } from "../types/api/registration-api.ts";

export const CompaniesList = () => {
  const [companies, setCompanies] = useState<CompanyData[]>([]);
  useEffect(() => {
    fetchCompanies(FETCH_COMPANIES).then((data) => {
      if (data) {
        setCompanies(data);
        console.log(data);
      }
    });
  }, []);

  const getNameInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("");
  };

  const getPropertySafe = (property: string | null) => {
    return property ? property : "N/A";
  };

  const columnsLayout = "grid-cols-[10%_15%_30%_20%_15%]";

  return (
    <div className="w-screen flex flex-col items-center mt-10">
      <div
        className={`w-[80%] h-[2.5rem] grid ${columnsLayout} text-left bg-[#ebebeb] font-open-sans font-regular rounded-[0.3rem] px-[3rem]`}
      >
        <div className="flex items-center">
          <input type="checkbox" className="w-4 h-4" />
        </div>
        <div className="flex items-center">MC Number</div>
        <div className="flex items-center">Name</div>
        <div className="flex items-center">Address</div>
        <div className="flex items-center">Service Date</div>
      </div>

      {companies.map((company, index) => (
        <div
          className={`w-[80%] h-[3.5rem] grid ${columnsLayout} hover:cursor-pointer hover:text-white hover:bg-light-blue text-left font-lato font-light px-[3rem] rounded-[0.3rem] ${
            index % 2 === 1 ? "bg-[#f6f6f6]" : "white"
          }`}
          key={index}
        >
          <div className="flex items-center">
            <input type="checkbox" className="w-4 h-4" />
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
          <div className="flex items-center">
            {getPropertySafe(company.serviceDate)}
          </div>
        </div>
      ))}
    </div>
  );
};
