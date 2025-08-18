export class ErroneousSections {
  erroneousSections: Map<string, boolean>;
  hasErrors: boolean;

  constructor() {
    this.erroneousSections = new Map<string, boolean>();
    this.hasErrors = false;
  }

  setErroneousSection(section: string) {
    this.hasErrors = true;
    this.erroneousSections.set(section, true);
  }

  hasErroneousSection(): boolean {
    return this.hasErrors;
  }

  getErroneousSections(): Map<string, boolean> {
    return this.erroneousSections;
  }
}
