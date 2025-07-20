import type { Renderable } from "../api/Renderable.ts";

export type LiveSearchCellData<D, R> = {
  searchKey: string;
  constructor: new (dto: D) => Renderable;
  saveObject?: (renderable: Renderable) => R;
};
