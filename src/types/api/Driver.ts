import type { Renderable } from "./Renderable.ts";
import type { DriverData } from "./registration-api.ts";

export class Driver implements Renderable {
  uuid: string;
  firstName: string;
  lastName: string;
  truckNumber: string;
  trailerNumber: string;
  email: string;
  phoneNumber: string;
  maxLegalWeightCapacity: number;
  documentsStatus: number;

  constructor(driver: DriverData) {
    this.uuid = driver.uuid;
    this.firstName = driver.firstName;
    this.lastName = driver.lastName;
    this.truckNumber = driver.truckNumber;
    this.trailerNumber = driver.trailerNumber;
    this.email = driver.email;
    this.phoneNumber = driver.phoneNumber;
    this.maxLegalWeightCapacity = driver.maxLegalWeightCapacity;
    this.documentsStatus = driver.documentsStatus;
  }

  renderOnList(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  renderOnForm(): string {
    return `
      ${this.firstName} ${this.lastName} | ${this.phoneNumber}<br>
      Trk# ${this.truckNumber} Trl# ${this.trailerNumber} | ${this.maxLegalWeightCapacity} lbs<br>
      ${this.documentsStatus}<br>
      ${this.email}
    `;
  }

  getUuid(): string {
    return this.uuid;
  }
}
