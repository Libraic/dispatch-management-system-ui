import type { Renderable } from "./Renderable.ts";
import type { DispatcherData } from "../../api/dispatcher/dispatcher-api-response-types.ts";

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
