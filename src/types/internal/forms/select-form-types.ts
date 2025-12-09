import type { ReactNode } from "react";

export type SelectFormData<T extends ReactNode, D extends string | number> = {
  initialValue: D;
  data: T[];
  setElement: (value: string) => void;
  label?: string;
};
