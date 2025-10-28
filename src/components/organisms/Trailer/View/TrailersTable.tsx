import { TableHead } from "../../../molecules/ListView/TableHead.tsx";
import type { TrailerData } from "../../../../types/api/trailer/trailer-api-response-types.ts";
import {
  TRAILERS_VIEW_COLUMNS,
  TRAILERS_VIEW_COLUMNS_LAYOUT,
} from "../../../../constants/trailers/trailers-table-constants.ts";
import * as React from "react";
import { TrailersTableContent } from "../../../molecules/Trailer/View/TrailerTableContent.tsx";

export const TrailersTable: React.FC<{ trailers: TrailerData[] }> = ({
  trailers,
}) => {
  return (
    <div className="h-[30rem]">
      <div className="flex flex-col items-center justify-center text-solid-black">
        <TableHead
          columnsLayout={TRAILERS_VIEW_COLUMNS_LAYOUT}
          listColumns={TRAILERS_VIEW_COLUMNS}
        />
        <TrailersTableContent trailers={trailers} />
      </div>
    </div>
  );
};
