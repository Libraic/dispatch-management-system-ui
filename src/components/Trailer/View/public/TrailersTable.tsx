import { TableHead } from "#/ui/Table/public/TableHead";
import type { TrailerData } from "#/types/api/trailer/trailer-api-response-types";
import {
  TRAILERS_VIEW_COLUMNS,
  TRAILERS_VIEW_COLUMNS_LAYOUT,
} from "#/constants/trailers/trailers-table-constants";
import * as React from "react";
import { TrailersTableContent } from "#/components/Trailer/View/internal/TrailerTableContent";

export const TrailersTable: React.FC<{ trailers: TrailerData[] }> = ({
  trailers,
}) => {
  return (
    <div className="h-[30rem]">
      <div className="flex flex-col text-solid-black">
        <TableHead
          columnsLayout={TRAILERS_VIEW_COLUMNS_LAYOUT}
          listColumns={TRAILERS_VIEW_COLUMNS}
        />
        <TrailersTableContent trailers={trailers} />
      </div>
    </div>
  );
};
