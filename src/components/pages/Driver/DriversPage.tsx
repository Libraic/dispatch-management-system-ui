import { useEffect, useState } from "react";
import { getDrivers } from "../../../service/driverService.ts";
import { useParams } from "react-router-dom";
import { PaginationDetails } from "../../organisms/Pagination/PaginationDetails.tsx";
import { DriversTable } from "../../organisms/Driver/View/DriversTable.tsx";
import { ListViewHeader } from "../../organisms/Table/ListViewHeader.tsx";
import type { DriverData } from "../../../types/api/driver/driver-api-response-types.ts";
import { DRIVER_REGISTRATION } from "../../../constants/route/internal-route-constants.ts";
import driverIcon from "../../../assets/company-menu/drivers-black.svg";
import { PageableEntity } from "../../../types/api/common/api-query-types.ts";
import { DRIVERS_PAGE_HEADER } from "../../../constants/common/header-constants.ts";

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
      <ListViewHeader
        companyUuid={companyUuid!!}
        headerData={DRIVERS_PAGE_HEADER}
        viewIcon={driverIcon}
        buttonSubroute={DRIVER_REGISTRATION}
        buttonLabel="Add Driver"
      />
      <DriversTable drivers={drivers} />
      <PaginationDetails
        joinableEntityId={companyUuid!!}
        entityType={PageableEntity.DRIVER}
        fetchFn={fetchDriversBasedOnPage}
      />
    </div>
  );
};
