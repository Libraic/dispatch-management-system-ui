import type { Renderable } from "./Renderable.ts";
import type { GetCityAndStateResponse } from "../../api/city/city-api-responses.ts";

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
