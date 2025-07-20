import type { Renderable } from "./Renderable.ts";
import type { DriverData } from "./driver-api.ts";

export class Driver implements Renderable {
  driverData: DriverData;

  constructor(driver: DriverData) {
    this.driverData = driver;
  }

  renderOnList(): string {
    return `${this.driverData.firstName} ${this.driverData.lastName}`;
  }

  renderOnForm(): string {
    const stateCode = this.driverData.state.split(",")[1];
    return `
      ${this.driverData.firstName} ${this.driverData.lastName} | ${this.driverData.phoneNumber}<br>
      Trk# ${this.driverData.truckNumber} Trl# ${this.driverData.trailerNumber} | ${this.driverData.maxLegalWeightCapacity} lbs<br>
      ${this.driverData.city}, ${stateCode} | ${this.driverData.documentsStatus}<br>
      ${this.driverData.email}
    `;
  }

  getUuid(): string {
    return this.driverData.uuid;
  }

  getTruckData(): string {
    return `
      ${this.driverData.trailerLength}' ${this.driverData.trailerType}
      ${this.driverData.trailerHeight}'' tall
    `;
  }
}
