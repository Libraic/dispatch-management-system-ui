import type { Renderable } from "./Renderable";
import type { DispatcherData } from "#/types/api/dispatcher/dispatcher-api-response-types";

export class Dispatcher implements Renderable {
  uuid: string;
  name: string;

  constructor(dispatcherData: DispatcherData) {
    this.uuid = dispatcherData.uuid;
    this.name = dispatcherData.name;
  }

  renderOnList(): string {
    return this.name;
  }

  renderOnForm(): string {
    return this.renderOnList();
  }

  getUuid(): string {
    return this.uuid;
  }
}
