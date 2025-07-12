import type { Renderable } from "./Renderable.ts";
import type { UserData } from "./registration-api.ts";

export class User implements Renderable {
  uuid: string;
  firstName: string;
  nickname: string | null;
  lastName: string;

  constructor(userData: UserData) {
    this.uuid = userData.uuid;
    this.firstName = userData.firstName;
    this.nickname = userData.nickname;
    this.lastName = userData.lastName;
  }

  render(): string {
    return this.nickname !== null
      ? `${this.firstName} "${this.nickname}" ${this.lastName}`
      : `${this.firstName} ${this.lastName}`;
  }

  getUuid(): string {
    return this.uuid;
  }
}
