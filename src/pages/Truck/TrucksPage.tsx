import { TableHeader } from "#/ui/Table/public/TableHeader";
import { TRUCK_REGISTRATION } from "#/shared/routes/routes";
import { useParams } from "react-router-dom";
import { TrucksTable } from "#/components/Truck/View/public/TrucksTable";
import { useCallback, useEffect, useState } from "react";
import type { TruckData } from "#/types/api/truck/truck-api-response-types";
import { getTrucks } from "#/service/truckService";
import { PaginationBar } from "#/ui/PaginationBar/public/PaginationBar";
import { Entity } from "#/types/api/common/api-query-types";
import { TRUCKS_PAGE_HEADER } from "#/constants/common/header-constants";

export const TrucksPage = () => {
  const { companyUuid } = useParams();
  const [trucks, setTrucks] = useState<TruckData[]>([]);

  useEffect(() => {
    getTrucks(companyUuid!!).then((data) => setTrucks(data));
  }, [companyUuid]);

  const fetchTrucksBasedOnPage = useCallback(
    async (pageNumber: number) => {
      const trucks = await getTrucks(companyUuid!!, pageNumber);
      setTrucks(trucks);
    },
    [companyUuid],
  );

  return (
    <div className="flex flex-col justify-center gap-y-[1.5rem] mx-[4rem]">
      <TableHeader
        companyUuid={companyUuid!!}
        headerData={TRUCKS_PAGE_HEADER}
        iconCode={"local_shipping"}
        buttonSubroute={TRUCK_REGISTRATION}
        buttonLabel="Add Truck"
      />
      <TrucksTable trucks={trucks} />
      <PaginationBar
        joinableEntityId={companyUuid!!}
        entityType={Entity.TRUCK}
        fetchFn={fetchTrucksBasedOnPage}
      />
    </div>
  );
};
