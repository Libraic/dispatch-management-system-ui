import type { Renderable } from "./Renderable";
import type { GetCityAndStateResponse } from "#/types/api/city/city-api-responses";

export class City implements Renderable {
  zip: string;
  city: string;
  state: string;

  constructor(response: GetCityAndStateResponse) {
    this.zip = response.zip;
    this.city = response.city;
    this.state = response.state;
  }

  renderOnList(): string {
    return `${this.city}, ${this.state}`;
  }
  renderOnForm(): string {
    return `${this.city}, ${this.state}`;
  }
  getUuid(): string {
    return this.zip;
  }
}
