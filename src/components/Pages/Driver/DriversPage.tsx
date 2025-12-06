import { useCallback, useEffect, useState } from "react";
import { getDrivers } from "../../../service/driverService.ts";
import { useParams } from "react-router-dom";
import { PaginationBar } from "../../Common/Pagination/public/PaginationBar.tsx";
import { DriversTable } from "../../Driver/View/public/DriversTable.tsx";
import { TableHeader } from "../../Common/Table/public/TableHeader.tsx";
import type { DriverData } from "../../../types/api/driver/driver-api-response-types.ts";
import { DRIVER_REGISTRATION } from "../../../constants/route/internal-route-constants.ts";
import driverIcon from "../../../assets/company-menu/drivers-black.svg";
import { Entity } from "../../../types/api/common/api-query-types.ts";
import { DRIVERS_PAGE_HEADER } from "../../../constants/common/header-constants.ts";

export const DriversPage = () => {
  const [drivers, setDrivers] = useState<DriverData[]>([]);

  const { companyUuid } = useParams();
  useEffect(() => {
    getDrivers(companyUuid!!).then((data) => setDrivers(data));
  }, [companyUuid]);

  const fetchDriversBasedOnPage = useCallback(
    async (pageNumber: number) => {
      const drivers = await getDrivers(companyUuid!!, pageNumber);
      setDrivers(drivers);
    },
    [companyUuid],
  );

  return (
    <div className="flex flex-col w-screen justify-center gap-y-[1.5rem]">
      <TableHeader
        companyUuid={companyUuid!!}
        headerData={DRIVERS_PAGE_HEADER}
        viewIcon={driverIcon}
        buttonSubroute={DRIVER_REGISTRATION}
        buttonLabel="Add Driver"
      />
      <DriversTable drivers={drivers} />
      <PaginationBar
        joinableEntityId={companyUuid!!}
        entityType={Entity.DRIVER}
        fetchFn={fetchDriversBasedOnPage}
      />
    </div>
  );
};
