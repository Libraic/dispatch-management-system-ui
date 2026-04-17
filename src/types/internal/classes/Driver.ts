import type { Renderable } from "./Renderable";
import type { DriverData } from "#/types/api/driver/driver-api-response-types";

export class Driver implements Renderable {
  name: string;
  uuid: string;

  constructor(driver: DriverData) {
    this.name = driver.fullName;
    this.uuid = driver.uuid;
  }

  renderOnList(): string {
    return this.name;
  }

  renderOnForm(): string {
    return this.name;
  }

  getUuid(): string {
    return this.uuid;
  }

  getTruckData(): string {
    return `
      N/A
    `;
  }
}
