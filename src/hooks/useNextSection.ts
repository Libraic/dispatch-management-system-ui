import { useState } from "react";
import { type SectionData, SectionEnum } from "../types/authentication.ts";

export const useNextSection = (): SectionData => {
  const [index, setIndex] = useState(0);
  const [activeSection, setActiveSection] = useState<SectionEnum>(
    SectionEnum.BASIC_INFORMATION,
  );
  return {
    next: () => {
      setIndex((prev) =>
        prev === Object.keys(SectionEnum).length ? 0 : prev + 1,
      );
      const keys = Object.keys(SectionEnum) as (keyof typeof SectionEnum)[];
      setActiveSection(SectionEnum[keys[index]]);
    },
    setActiveSection: (section: SectionEnum) => {
      setActiveSection(section);
      const values = Object.values(SectionEnum);
      setIndex(values.indexOf(section));
    },
    getActiveSection: () => activeSection,
  };
};
