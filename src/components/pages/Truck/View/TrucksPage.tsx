import { ListViewHeader } from "../../../organisms/Table/ListViewHeader.tsx";
import { TRUCK_REGISTRATION } from "../../../../constants/route/internal-route-constants.ts";
import { useParams } from "react-router-dom";
import truckIcon from "../../../../assets/company-menu/trucks-list.svg";
import { TrucksTable } from "../../../organisms/Truck/View/TrucksTable.tsx";
import { useEffect, useState } from "react";
import type { TruckData } from "../../../../types/api/truck/truck-api-response-types.ts";
import { getTrucks } from "../../../../service/truckService.ts";
import { PaginationDetails } from "../../../organisms/Pagination/PaginationDetails.tsx";
import { TRUCKS_PAGINATION_DETAILS } from "../../../../constants/api/api-paths.ts";

export const TrucksPage = () => {
  const { companyUuid } = useParams();
  const [trucks, setTrucks] = useState<TruckData[]>([]);

  useEffect(() => {
    getTrucks(companyUuid!!).then((data) => setTrucks(data));
  }, [companyUuid]);

  const fetchTrucksBasedOnPage = async (pageNumber: number) => {
    const trucks = await getTrucks(companyUuid!!, pageNumber);
    setTrucks(trucks);
  };

  return (
    <div className="flex flex-col w-screen justify-center gap-y-[1.5rem]">
      <ListViewHeader
        companyUuid={companyUuid!!}
        viewTitle="Trucks List"
        viewDescription="Manage your trucks"
        viewIcon={truckIcon}
        buttonSubroute={TRUCK_REGISTRATION}
        buttonLabel="Add Truck"
      />
      <TrucksTable trucks={trucks} />
      <PaginationDetails
        joinableEntityId={companyUuid!!}
        paginationUrl={TRUCKS_PAGINATION_DETAILS}
        fetchFn={fetchTrucksBasedOnPage}
      />
    </div>
  );
};
