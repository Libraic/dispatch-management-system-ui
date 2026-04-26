import { useCallback, useEffect, useState } from "react";
import { getDrivers } from "#/service/driverService";
import { useParams } from "react-router-dom";
import { PaginationBar } from "#/ui/PaginationBar/public/PaginationBar";
import { DriversTable } from "#/features/drivers/components/View/public/DriversTable";
import { TableHeader } from "#/ui/Table/public/TableHeader";
import type { DriverData } from "#/types/api/driver/driver-api-response-types";
import { DRIVER_REGISTRATION } from "#/shared/routes/routes";
import { Entity } from "#/types/api/common/api-query-types";
import { DRIVERS_PAGE_HEADER } from "#/constants/common/header-constants";

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
    <div className="flex flex-col justify-center gap-y-[1.5rem] mx-[4rem]">
      <TableHeader
        companyUuid={companyUuid!!}
        headerData={DRIVERS_PAGE_HEADER}
        iconCode="badge"
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
