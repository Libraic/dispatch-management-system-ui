import type { Value } from "../../api/reports/load-by-load-types.ts";

export type SpanValue = {
  value: Value;
  span: number;
};

export type LoadByLoadModel = {
  key: string;
  subjectName: string;
  dailyItems: Map<string, SpanValue[]>;
  windowItems: Map<string, SpanValue[]>;
};
