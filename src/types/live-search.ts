import type { Renderable } from "./api/Renderable.ts";

export type LiveSearchInputFormProps<D> = {
  label: string;
  placeholder: string;
  value: string;
  searchKey: string;
  isMandatory?: boolean;
  errorText?: string;
  saveData: (value: Renderable) => void;
  cleanData: () => void;
  constructor: new (dto: D) => Renderable;
};

export type LiveSearchResultData = {
  items: Renderable[];
  onClick: (item: Renderable) => void;
};
