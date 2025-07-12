import type { Renderable } from "./Renderable.ts";
import type { CompanyData } from "./registration-api.ts";

export class Company implements Renderable {
  uuid: string;
  name: string;

  constructor(company: CompanyData) {
    this.uuid = company.uuid;
    this.name = company.name;
  }

  render(): string {
    return this.name;
  }

  getUuid(): string {
    return this.uuid;
  }
}
