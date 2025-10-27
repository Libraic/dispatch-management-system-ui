import type { Renderable } from "./Renderable.ts";
import type { UserData } from "../../api/user/user-api-response-types.ts";

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

  renderOnList(): string {
    return this.nickname !== null
      ? `${this.firstName} "${this.nickname}" ${this.lastName}`
      : `${this.firstName} ${this.lastName}`;
  }

  renderOnForm(): string {
    return this.renderOnList();
  }

  getUuid(): string {
    return this.uuid;
  }
}
