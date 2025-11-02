import type { Renderable } from "../../internal/classes/Renderable.ts";
import type { Pagination } from "../../internal/pagination/pagination-types.ts";

export type LiveSearchResultData = {
  items: Renderable[];
  pagination: Pagination;
  onItemSelected: (item: Renderable) => void;
};
