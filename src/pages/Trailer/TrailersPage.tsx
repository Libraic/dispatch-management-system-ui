import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { TableHeader } from "#/ui/Table/public/TableHeader";
import { TRAILER_REGISTRATION } from "#/constants/route/internal-route-constants";
import { PaginationBar } from "#/ui/PaginationBar/public/PaginationBar";
import { Entity } from "#/types/api/common/api-query-types";
import type { TrailerData } from "#/types/api/trailer/trailer-api-response-types";
import { getTrailers } from "#/service/trailerService";
import { TrailersTable } from "#/components/Trailer/View/public/TrailersTable";
import { TRAILERS_PAGE_HEADER } from "#/constants/common/header-constants";
import { SidebarWrapper } from "#/components/SidebarWrapper";
import { TRAILERS_CODE } from "#/features/trailers/constants/ui.constants";

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
