import { useParams } from "react-router-dom";
import { useCallback } from "react";
import { usePage } from "#/shared/hooks/usePage";
import { usePagination } from "#/shared/hooks/usePagination";
import { getLoads } from "#/features/planner/api/loads.api";
import type { LoadsTableContextData } from "#/features/loads/context/context.types";
import { TableHeader } from "#/ui/Table/public/TableHeader";
import { LOADS_PAGE_HEADER } from "#/constants/common/header-constants";
import { PLANNER } from "#/shared/routes/routes";
import { PaginationBar } from "#/ui/PaginationBar/public/PaginationBar";
import { LoadsTableContext } from "#/features/loads/context/LoadsTableContext";
import { LoadsTable } from "#/features/loads/components/View/ui/LoadsTable";
import type { Load } from "#/features/loads/components/View/view.types";
import { useColumns } from "#/features/loads/components/View/hooks/useColumns";
import { BLANK_SPACE, BLANK_STRING } from "#/constants/common/global-constants";
import type { Column } from "#/shared/types/view.types";

export const LoadsPage = () => {
  const { companyUuid } = useParams();
  const fetchLoads = useCallback(
    (pageNumber?: number) => getLoads(companyUuid!, pageNumber),
    [companyUuid],
  );
  const { data, loadPage } = usePage<Load>(fetchLoads);
  const pagination = usePagination(data.page);

  const columns = useColumns();
  const updatedColumns: Column[] = [
    { key: BLANK_STRING, label: BLANK_STRING },
    ...columns,
  ];

  const context: LoadsTableContextData = {
    pagination,
    loads: data,
    columns: updatedColumns,
    // TODO: Consider adding the size of each column on backend
    layout: updatedColumns
      .map((_val, index) =>
        index !== 0 ? "minmax(10rem, 1fr)" : "minmax(5rem, 1fr)",
      )
      .join(BLANK_SPACE),
    fetchFn: loadPage,
  };

  return (
    <div className="flex flex-col justify-center gap-y-[1.5rem] mx-[4rem]">
      <TableHeader
        companyUuid={companyUuid!!}
        headerData={LOADS_PAGE_HEADER}
        iconCode="badge"
        buttonSubroute={PLANNER}
        buttonLabel="Add Load"
      />
      <LoadsTableContext value={context}>
        <LoadsTable />
      </LoadsTableContext>
      <PaginationBar pagination={pagination} fetchFn={loadPage} />
    </div>
  );
};
