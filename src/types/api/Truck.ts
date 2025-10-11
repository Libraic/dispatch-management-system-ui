import type { Renderable } from "./Renderable.ts";
import type { TruckData } from "../assets/asset-data.ts";

export class Truck implements Renderable {
  uuid: string;
  truckNumber: string;

  constructor(truckData: TruckData) {
    this.uuid = truckData.uuid;
    this.truckNumber = truckData.truckNumber;
  }

  renderOnList(): string {
    return this.truckNumber;
  }
  renderOnForm(): string {
    return this.renderOnList();
  }
  getUuid(): string {
    return this.uuid;
  }
}
