import { useParams } from "react-router-dom";
import { TableHeader } from "#/ui/Table/public/TableHeader";
import { TRAILER_REGISTRATION } from "#/shared/routes/routes";
import { PaginationBar } from "#/ui/PaginationBar/public/PaginationBar";
import type { TrailerData } from "#/types/api/trailer/trailer-api-response-types";
import { TrailersTable } from "#/components/Trailer/View/public/TrailersTable";
import { TRAILERS_PAGE_HEADER } from "#/constants/common/header-constants";
import { usePagination } from "#/shared/hooks/usePagination";
import { usePage } from "#/shared/hooks/usePage";
import { getTrailers } from "#/features/trailers/api/trailers.api";
import { useCallback } from "react";

export const TrailersPage = () => {
  const { companyUuid } = useParams();
  const fetchTrailers = useCallback(
    (pageNumber?: number) => getTrailers(companyUuid!, pageNumber),
    [companyUuid],
  );

  const { data, loadPage } = usePage<TrailerData>(fetchTrailers);
  const pagination = usePagination(data.page);

  return (
    <div className="flex flex-col justify-center gap-y-[1.5rem] mx-[4rem]">
      <TableHeader
        companyUuid={companyUuid!!}
        headerData={TRAILERS_PAGE_HEADER}
        buttonSubroute={TRAILER_REGISTRATION}
        buttonLabel="Add Trailer"
      />
      <TrailersTable trailers={data} />
      <PaginationBar pagination={pagination} fetchFn={loadPage} />
    </div>
  );
};
