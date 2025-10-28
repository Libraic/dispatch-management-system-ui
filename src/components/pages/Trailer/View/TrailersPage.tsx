import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ListViewHeader } from "../../../organisms/Table/ListViewHeader.tsx";
import trailerIcon from "../../../../assets/company-menu/trailers-list.svg";
import { TRAILER_REGISTRATION } from "../../../../constants/route/internal-route-constants.ts";
import { PaginationDetails } from "../../../organisms/Pagination/PaginationDetails.tsx";
import { PageableEntity } from "../../../../types/api/common/api-query-types.ts";
import type { TrailerData } from "../../../../types/api/trailer/trailer-api-response-types.ts";
import { getTrailers } from "../../../../service/trailerService.ts";
import { TrailersTable } from "../../../organisms/Trailer/View/TrailersTable.tsx";
import { TRAILERS_PAGE_HEADER } from "../../../../constants/common/header-constants.ts";

export const TrailersPage = () => {
  const { companyUuid } = useParams();
  const [trailers, setTrailers] = useState<TrailerData[]>([]);

  useEffect(() => {
    getTrailers(companyUuid!!).then((data) => setTrailers(data));
  }, [companyUuid]);

  const fetchTrailersBasedOnPage = async (pageNumber: number) => {
    const trailers = await getTrailers(companyUuid!!, pageNumber);
    setTrailers(trailers);
  };

  return (
    <div className="flex flex-col w-screen justify-center gap-y-[1.5rem]">
      <ListViewHeader
        companyUuid={companyUuid!!}
        headerData={TRAILERS_PAGE_HEADER}
        viewIcon={trailerIcon}
        buttonSubroute={TRAILER_REGISTRATION}
        buttonLabel="Add Trailer"
      />
      <TrailersTable trailers={trailers} />
      <PaginationDetails
        joinableEntityId={companyUuid!!}
        entityType={PageableEntity.TRAILER}
        fetchFn={fetchTrailersBasedOnPage}
      />
    </div>
  );
};
