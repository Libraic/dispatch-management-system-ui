import type { Renderable } from "../../internal/classes/Renderable.ts";

export type LiveSearchResultData = {
  items: Renderable[];
  areMoreBatchesAvailable: boolean;
  nextBatch: () => void;
  onClick: (item: Renderable) => void;
};
