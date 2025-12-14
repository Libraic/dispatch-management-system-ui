import type { Subject } from "./kpi-api-response-types.ts";

export type Value = number | string;

export type LoadByLoadItem<T> = {
  label: string;
  value: T;
};

export type LoadByLoadData = {
  start: string;
  end: string;
  loadByLoadItemsPerWindow: LoadByLoadItem<Value>[];
  loadByLoadItemsPerDay: LoadByLoadItem<Value>[][];
};

export type LoadByLoadResponse = {
  subject: Subject;
  loadByLoadData: LoadByLoadData[];
};
