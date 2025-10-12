import { useEffect, useState } from "react";
import { getDrivers } from "../../service/driver-service.ts";
import { useNavigate, useParams } from "react-router-dom";
import driverIcon from "../../assets/company-menu/drivers-black.svg";
import addIcon from "../../assets/global/add-no-border.svg";
import type { DriverData } from "../../types/api/driver-api.ts";
import { DRIVER_REGISTRATION } from "../../utils/constants/internal-routes.ts";

export const DriversView = () => {
  const [drivers, setDrivers] = useState<DriverData[]>([]);

  const { companyUuid } = useParams();
  useEffect(() => {
    getDrivers(companyUuid!!).then((data) => setDrivers(data));
  }, [companyUuid]);

  const navigate = useNavigate();

  const columns = ["Name", "Truck", "Trailer", "State", "City"];
  const columnsLayout = "grid-cols-[15rem_15rem_15rem_15rem_35rem_5rem]";
  return (
    <div className="flex flex-col w-screen justify-center gap-y-[1.5rem]">
      <div className="flex items-center justify-between flex-row w-[95%] mx-[2.5rem]">
        <div className="flex flex-row items-center gap-x-[0.25rem]">
          <img className="w-25 h-25" src={driverIcon} alt="driver-icon" />
          <div className="flex flex-col">
            <p className="font-open-sans font-bold text-[1.5rem]">
              Drivers List
            </p>
            <p className="font-open-sans font-thin text-[0.9rem]">
              Manage your drivers
            </p>
          </div>
        </div>
        <div
          onClick={() =>
            navigate(`/dashboard/${companyUuid}${DRIVER_REGISTRATION}`)
          }
          className="flex flex-row items-center font-lato font-normal px-3 py-1 rounded-[0.25rem] hover:cursor-pointer bg-light-blue hover:bg-solid-blue text-white text-[0.85rem] hover:border-none gap-x-[0.5rem]"
        >
          <img className="w-6 h-6" src={addIcon} alt="add-icon" />
          <p>Add Driver</p>
        </div>
      </div>
      <div>
        <div className="flex flex-col items-center justify-center">
          <div
            className={`grid ${columnsLayout} h-[2.75rem] w-[95%] bg-[#ebecf0] font-inter font-bold text-[0.85rem] px-[2rem] rounded-t-[0.3rem]`}
          >
            {columns.map((column, index) => (
              <div className="flex items-center" key={index}>
                {column}
              </div>
            ))}
          </div>
          {drivers.map((driver, index) => (
            <div
              key={index}
              className={`grid items-center ${columnsLayout} h-[2.75rem] w-[95%] font-plus-jakarta-sans font-normal text-[0.85rem] px-[2rem] hover:bg-light-blue hover:border-b-light-blue  hover:text-white border-b-2 border-b-[#ebecf0]`}
            >
              <div>{`${driver.firstName} ${driver.lastName}`}</div>
              <div>{driver.truckNumber}</div>
              <div>{driver.trailerNumber}</div>
              <div>{driver.state}</div>
              <div>{driver.city}</div>
              <div className="hover:cursor-pointer font-black pb-[0.4rem]">
                ...
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
