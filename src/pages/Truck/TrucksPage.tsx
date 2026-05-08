import { TableHeader } from "#/ui/Table/public/TableHeader";
import { TRUCK_REGISTRATION } from "#/shared/routes/routes";
import { useParams } from "react-router-dom";
import { TrucksTable } from "#/components/Truck/View/public/TrucksTable";
import { PaginationBar } from "#/ui/PaginationBar/public/PaginationBar";
import { TRUCKS_PAGE_HEADER } from "#/constants/common/header-constants";
import { usePagination } from "#/shared/hooks/usePagination";
import { usePage } from "#/shared/hooks/usePage";
import type { TruckData } from "#/types/api/truck/truck-api-response-types";
import { getTrucks } from "#/features/trucks/api/trucks.api";
import { useCallback } from "react";

export const TrucksPage = () => {
  const { companyUuid } = useParams();
  const fetchTrucks = useCallback(
    (pageNumber?: number) => getTrucks(companyUuid!, pageNumber),
    [companyUuid],
  );
  const { data, loadPage } = usePage<TruckData>(fetchTrucks);
  const pagination = usePagination(data.page);

  return (
    <div className="flex flex-col justify-center gap-y-[1.5rem] mx-[4rem]">
      <TableHeader
        companyUuid={companyUuid!!}
        headerData={TRUCKS_PAGE_HEADER}
        iconCode={"local_shipping"}
        buttonSubroute={TRUCK_REGISTRATION}
        buttonLabel="Add Truck"
      />
      <TrucksTable trucks={data} />
      <PaginationBar pagination={pagination} fetchFn={loadPage} />
    </div>
  );
};
