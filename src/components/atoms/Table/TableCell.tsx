import * as React from "react";
import { NOT_AVAILABLE } from "../../../constants/common/global-constants.ts";

export const TableCell: React.FC<{ data: string | number }> = ({ data }) => {
  return <div>{data ?? NOT_AVAILABLE}</div>;
};
