import type { Renderable } from "../api/Renderable.ts";

export type LiveSearchCellData<D> = {
  searchKey: string;
  constructor: new (dto: D) => Renderable;
};
