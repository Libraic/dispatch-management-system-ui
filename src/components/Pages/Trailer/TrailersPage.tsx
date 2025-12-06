import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { TableHeader } from "../../Common/Table/public/TableHeader.tsx";
import trailerIcon from "../../../assets/company-menu/trailers-list.svg";
import { TRAILER_REGISTRATION } from "../../../constants/route/internal-route-constants.ts";
import { PaginationBar } from "../../Common/Pagination/public/PaginationBar.tsx";
import { Entity } from "../../../types/api/common/api-query-types.ts";
import type { TrailerData } from "../../../types/api/trailer/trailer-api-response-types.ts";
import { getTrailers } from "../../../service/trailerService.ts";
import { TrailersTable } from "../../Trailer/View/public/TrailersTable.tsx";
import { TRAILERS_PAGE_HEADER } from "../../../constants/common/header-constants.ts";

export const TrailersPage = () => {
  const { companyUuid } = useParams();
  const [trailers, setTrailers] = useState<TrailerData[]>([]);

  useEffect(() => {
    getTrailers(companyUuid!!).then((data) => setTrailers(data));
  }, [companyUuid]);

  const fetchTrailersBasedOnPage = useCallback(
    async (pageNumber: number) => {
      const trailers = await getTrailers(companyUuid!!, pageNumber);
      setTrailers(trailers);
    },
    [companyUuid],
  );

  return (
    <div className="flex flex-col w-screen justify-center gap-y-[1.5rem]">
      <TableHeader
        companyUuid={companyUuid!!}
        headerData={TRAILERS_PAGE_HEADER}
        viewIcon={trailerIcon}
        buttonSubroute={TRAILER_REGISTRATION}
        buttonLabel="Add Trailer"
      />
      <TrailersTable trailers={trailers} />
      <PaginationBar
        joinableEntityId={companyUuid!!}
        entityType={Entity.TRAILER}
        fetchFn={fetchTrailersBasedOnPage}
      />
    </div>
  );
};
