import type { Renderable } from "../api/Renderable.ts";
import type { SearchCriteria } from "../api/common.ts";

export type LiveSearchCellData<D, R> = {
  defaultSearchKey: string;
  constructor: new (dto: D) => Renderable;
  object: Renderable | null;
  saveObject?: (renderable: Renderable) => R;
  customSearchCriteria?: SearchCriteria[];
  errorMessage?: string;
};
