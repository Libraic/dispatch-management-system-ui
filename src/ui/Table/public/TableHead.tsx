import { type FC, Fragment } from "react";
import type { Column } from "#/shared/types/view.types";
import { BLANK_SPACE, BLANK_STRING } from "#/constants/common/global-constants";

type TableHeadProps = {
  columns: Column[];
  layout?: string;
};

// TODO: Construct the layout from the columns and add it to the context
export const TableHead: FC<TableHeadProps> = ({ columns, layout }) => {
  return (
    <Fragment>
      <div
        className={`grid ${layout ?? BLANK_STRING} h-[2.75rem] bg-[#f4f4fb] font-bold text-[0.85rem] px-[2rem] rounded-t-[0.3rem] tracking-wide w-fit`}
        style={
          !layout
            ? {
                gridTemplateColumns: columns
                  .map((_val, index) =>
                    index !== 0 ? "minmax(10rem, 1fr)" : "minmax(5rem, 1fr)",
                  )
                  .join(BLANK_SPACE),
              }
            : undefined
        }
      >
        {columns.map((column) => (
          <div
            className="flex items-center text-gray-500 w-fit"
            key={column.label}
          >
            {column.label}
          </div>
        ))}
      </div>
    </Fragment>
  );
};
