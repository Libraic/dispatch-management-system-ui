import { TableHead } from "#/ui/Table/public/TableHead";
import type { TrailerData } from "#/types/api/trailer/trailer-api-response-types";
import {
  TRAILERS_VIEW_COLUMNS,
  TRAILERS_VIEW_COLUMNS_LAYOUT,
} from "#/constants/trailers/trailers-table-constants";
import * as React from "react";
import { TrailersTableContent } from "#/components/Trailer/View/internal/TrailerTableContent";
import type { Page } from "#/shared/types/api.types";

export const TrailersTable: React.FC<{ trailers: Page<TrailerData> }> = ({
  trailers,
}) => {
  return (
    <div className="overflow-x-auto h-[30rem]">
      <div className="text-solid-black">
        <TableHead
          layout={TRAILERS_VIEW_COLUMNS_LAYOUT}
          columns={TRAILERS_VIEW_COLUMNS}
        />
        <TrailersTableContent trailers={trailers} />
      </div>
    </div>
  );
};
