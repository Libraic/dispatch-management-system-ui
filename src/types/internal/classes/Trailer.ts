import type { Renderable } from "./Renderable";
import type { TrailerData } from "#/types/api/trailer/trailer-api-response-types";

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
