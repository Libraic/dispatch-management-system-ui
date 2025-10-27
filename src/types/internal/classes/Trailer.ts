import type { Renderable } from "./Renderable.ts";
import type { TrailerData } from "../../api/trailer/trailer-api-response-types.ts";

export class Trailer implements Renderable {
  trailerNumber: string;
  uuid: string;

  constructor(trailerData: TrailerData) {
    this.trailerNumber = trailerData.trailerNumber;
    this.uuid = trailerData.uuid;
  }
  renderOnList(): string {
    return this.trailerNumber;
  }
  renderOnForm(): string {
    return this.renderOnList();
  }
  getUuid(): string {
    return this.uuid;
  }
}
