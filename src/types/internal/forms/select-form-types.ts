import type { ReactNode } from "react";
import type { Pagination } from "../../global.ts";

export type SelectFormData<T extends ReactNode, D extends string | number> = {
  label: string;
  initialValue: D;
  data: T[];
  pagination?: Pagination;
  setElement: (value: string) => void;
};
