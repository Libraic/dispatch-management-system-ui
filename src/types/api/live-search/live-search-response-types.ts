import type { Renderable } from "../../internal/classes/Renderable.ts";

export type LiveSearchResultData = {
  items: Renderable[];
  onClick: (item: Renderable) => void;
};
