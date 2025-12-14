import React from "react";
import type { LoadByLoadModel } from "../../../../types/internal/kpi/load-by-load-internal-types.ts";
import { BACKGROUND_BLUE_GREY_COLOR } from "../../../../tailwind/tailwind-colors-vars.ts";
import { LoadByLoadDriverCell } from "./LoadByLoadDriverCell.tsx";
import { LoadByLoadDataRow } from "./LoadByLoadDataRow.tsx";

export const LoadByLoadTableBody: React.FC<{
  data: LoadByLoadModel[];
}> = ({ data }) => {
  if (data.length === 0) {
    return null;
  }

  return (
    <tbody className={`font-roboto font-light ${BACKGROUND_BLUE_GREY_COLOR}`}>
      {data.map((loadByLoadModel) => (
        <React.Fragment key={loadByLoadModel.key}>
          <LoadByLoadDriverCell data={loadByLoadModel.subjectName} />
          {Array.from(loadByLoadModel.dailyItems).map(
            ([label, dailyValues]) => (
              <LoadByLoadDataRow dataLabel={label} data={dailyValues} />
            ),
          )}
          {Array.from(loadByLoadModel.windowItems).map(
            ([label, windowValues]) => (
              <LoadByLoadDataRow dataLabel={label} data={windowValues} />
            ),
          )}
        </React.Fragment>
      ))}
    </tbody>
  );
};
