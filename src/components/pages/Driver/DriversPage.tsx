import { useEffect, useState } from "react";
import { getDrivers } from "../../../service/driverService.ts";
import { useParams } from "react-router-dom";
import { PaginationDetails } from "../../organisms/Pagination/PaginationDetails.tsx";
import { DriversTable } from "../../molecules/Driver/View/DriversTable.tsx";
import { DriversViewHeader } from "../../organisms/Driver/View/DriversViewHeader.tsx";
import type { DriverData } from "../../../types/api/driver/driver-api-response-types.ts";

export const DriversPage = () => {
  const [drivers, setDrivers] = useState<DriverData[]>([]);

  const { companyUuid } = useParams();
  useEffect(() => {
    getDrivers(companyUuid!!).then((data) => setDrivers(data));
  }, [companyUuid]);

  const fetchDriversBasedOnPage = async (pageNumber: number) => {
    const drivers = await getDrivers(companyUuid!!, pageNumber);
    setDrivers(drivers);
  };

  return (
    <div className="flex flex-col w-screen justify-center gap-y-[1.5rem]">
      <DriversViewHeader companyUuid={companyUuid!!} />
      <DriversTable drivers={drivers} />
      <PaginationDetails
        joinableEntityId={companyUuid!!}
        fetchFn={fetchDriversBasedOnPage}
      />
    </div>
  );
};
