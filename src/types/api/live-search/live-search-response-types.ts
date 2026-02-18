import type { Renderable } from "../../internal/classes/Renderable.ts";
import type { Pagination } from "../../internal/pagination/pagination-types.ts";
import React from "react";

export type LiveSearchResultData = {
  items: Renderable[];
  pagination: Pagination;
  onItemSelected: (item: Renderable) => void;
  ref?: React.RefObject<HTMLDivElement | null>;
};
