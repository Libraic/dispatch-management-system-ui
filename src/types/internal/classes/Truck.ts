import type { Renderable } from "./Renderable.ts";
import type { TruckData } from "../../api/truck/truck-api-response-types.ts";

export class Truck implements Renderable {
  uuid: string;
  truckNumber: string;
  vinNumber: string;
  model: string;
  truckMake: string;
  fuelType: string;

  constructor(truckData: TruckData) {
    this.uuid = truckData.uuid;
    this.truckNumber = truckData.truckNumber;
    this.vinNumber = truckData.vinNumber;
    this.model = truckData.model;
    this.truckMake = truckData.truckMake;
    this.fuelType = truckData.fuelType;
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
