export interface Renderable {
  renderOnList(): string;
  renderOnForm(): string;
  getUuid(): string;
}
