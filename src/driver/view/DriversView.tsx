import { useEffect, useState } from "react";
import { getDrivers } from "../../service/driver-service.ts";
import { useParams } from "react-router-dom";
import type { DriverData } from "../../types/api/driver-api.ts";
import { PaginationDetails } from "./PaginationDetails.tsx";
import { DriversTable } from "./DriversTable.tsx";
import { DriversViewHeader } from "./DriversViewHeader.tsx";

export const DriversView = () => {
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
