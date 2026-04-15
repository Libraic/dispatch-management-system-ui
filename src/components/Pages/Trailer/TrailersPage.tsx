import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { TableHeader } from "../../Common/Table/public/TableHeader.tsx";
import { TRAILER_REGISTRATION } from "../../../constants/route/internal-route-constants.ts";
import { PaginationBar } from "../../Common/Pagination/public/PaginationBar.tsx";
import { Entity } from "../../../types/api/common/api-query-types.ts";
import type { TrailerData } from "../../../types/api/trailer/trailer-api-response-types.ts";
import { getTrailers } from "../../../service/trailerService.ts";
import { TrailersTable } from "../../Trailer/View/public/TrailersTable.tsx";
import { TRAILERS_PAGE_HEADER } from "../../../constants/common/header-constants.ts";
import { SidebarWrapper } from "../../SidebarWrapper.tsx";
import { TRAILERS_CODE } from "../../../features/trailers/constants/ui.constants.ts";

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
    <SidebarWrapper>
      <div className="flex flex-col justify-center gap-y-[1.5rem] mx-[4rem]">
        <TableHeader
          companyUuid={companyUuid!!}
          headerData={TRAILERS_PAGE_HEADER}
          iconCode={TRAILERS_CODE}
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
    </SidebarWrapper>
  );
};
