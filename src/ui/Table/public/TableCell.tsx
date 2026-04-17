import * as React from "react";
import { NOT_AVAILABLE } from "#/constants/common/global-constants";

type TableCellProps = { data: string | number };

export const TableCell: React.FC<TableCellProps> = ({ data }) => {
  return <div className="truncate min-w-0">{data ?? NOT_AVAILABLE}</div>;
};
