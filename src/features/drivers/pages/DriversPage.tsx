import { useParams } from "react-router-dom";
import { PaginationBar } from "#/ui/PaginationBar/public/PaginationBar";
import { DriversTable } from "#/features/drivers/components/View/public/DriversTable/DriversTable";
import { TableHeader } from "#/ui/Table/public/TableHeader";
import { DRIVER_REGISTRATION } from "#/shared/routes/routes";
import { DRIVERS_PAGE_HEADER } from "#/constants/common/header-constants";
import { usePagination } from "#/shared/hooks/usePagination";
import type { DriversTableContextData } from "#/features/drivers/context/context.types";
import { DriversTableContext } from "#/features/drivers/context/DriversTableContext";
import { getDrivers } from "#/features/drivers/api/drivers.api";
import { usePage } from "#/shared/hooks/usePage";
import { useCallback } from "react";
import type { DriverData } from "#/features/drivers/api/api.types";

export const DriversPage = () => {
  const { companyUuid } = useParams();
  const fetchDrivers = useCallback(
    (pageNumber?: number) => getDrivers(companyUuid!, pageNumber),
    [companyUuid],
  );
  const { data, loadPage } = usePage<DriverData>(fetchDrivers);
  const pagination = usePagination(data.page);

  const context: DriversTableContextData = {
    pagination,
    drivers: data,
    fetchFn: loadPage,
  };

  return (
    <div className="flex flex-col justify-center gap-y-[1.5rem] mx-[4rem]">
      <TableHeader
        companyUuid={companyUuid!!}
        headerData={DRIVERS_PAGE_HEADER}
        buttonSubroute={DRIVER_REGISTRATION}
        buttonLabel="Add Driver"
      />
      <DriversTableContext value={context}>
        <DriversTable />
      </DriversTableContext>
      <PaginationBar pagination={pagination} fetchFn={loadPage} />
    </div>
  );
};
