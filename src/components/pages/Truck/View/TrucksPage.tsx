import { TableHeader } from "../../../molecules/Table/TableHeader.tsx";
import { TRUCK_REGISTRATION } from "../../../../constants/route/internal-route-constants.ts";
import { useParams } from "react-router-dom";
import truckIcon from "../../../../assets/company-menu/trucks-list.svg";
import { TrucksTable } from "../../../organisms/Truck/View/TrucksTable.tsx";
import { useCallback, useEffect, useState } from "react";
import type { TruckData } from "../../../../types/api/truck/truck-api-response-types.ts";
import { getTrucks } from "../../../../service/truckService.ts";
import { PaginationBar } from "../../../organisms/Pagination/PaginationBar.tsx";
import { Entity } from "../../../../types/api/common/api-query-types.ts";
import { TRUCKS_PAGE_HEADER } from "../../../../constants/common/header-constants.ts";

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
    <div className="flex flex-col w-screen justify-center gap-y-[1.5rem]">
      <TableHeader
        companyUuid={companyUuid!!}
        headerData={TRUCKS_PAGE_HEADER}
        viewIcon={truckIcon}
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
