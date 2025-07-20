import type { Renderable } from "./Renderable.ts";
import type { DriverData } from "./driver-api.ts";
import { BLANK_STRING } from "../../utils/constants/global.ts";

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
    const city =
      this.driverData.city != null ? this.driverData.city : BLANK_STRING;
    return `
      ${this.driverData.firstName} ${this.driverData.lastName} | ${this.driverData.phoneNumber}<br>
      Trk# ${this.driverData.truckNumber} Trl# ${this.driverData.trailerNumber} | ${this.driverData.maxLegalWeightCapacity} lbs<br>
      ${city}, ${stateCode} | ${this.driverData.documentsStatus}<br>
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
