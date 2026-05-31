import type { FC } from "react";
import {
  BLANK_STRING,
  NOT_AVAILABLE,
} from "#/constants/common/global-constants";

type TableCellProps = {
  data?: string | number;
  styles?: string;
};

export const TableCell: FC<TableCellProps> = ({ data, styles }) => {
  return (
    <div className={`truncate min-w-0 ${styles ?? BLANK_STRING}`}>
      {data ?? NOT_AVAILABLE}
    </div>
  );
};
