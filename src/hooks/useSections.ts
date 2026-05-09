import { useState } from "react";

export type SectionsHandler = {
  getActiveSections: () => string[];
  areAllSectionsActivated: () => boolean;
  activateOrFocusNextSection: () => void;
  isSectionActive: (section: string) => boolean;
  focusSection: (section: string) => void;
  getFocusedSection: () => string;
  isSectionFocused: (section: string) => boolean;
  isSectionWithErrors: (section: string) => boolean;
  setErrors: (errors: string[]) => void;
  clearErrors: () => void;
};

export const useSections = (sections: string[]): SectionsHandler => {
  const [focusedSection, setFocusedSection] = useState<string>(sections[0]);
  const [activatedSections, setActivatedSections] = useState<string[]>([
    sections[0],
  ]);
  const [sectionsWithErrors, setSectionsWithErrors] = useState<string[]>([]);
  return {
    getActiveSections: () => activatedSections,
    areAllSectionsActivated: () => activatedSections.length === sections.length,
    activateOrFocusNextSection: () => {
      const index = sections.indexOf(focusedSection);
      if (index + 1 < sections.length) {
        const nextSection = sections[index + 1];
        if (!activatedSections.includes(nextSection)) {
          setActivatedSections([...activatedSections, nextSection]);
        }
        setFocusedSection(nextSection);
      }
    },
    focusSection: (section: string) => {
      if (activatedSections.includes(section)) {
        setFocusedSection(section);
      }
    },
    getFocusedSection: () => focusedSection,
    setErrors: (errors: string[]) => {
      if (errors.length !== 0) {
        setFocusedSection(errors[0]);
      }
      setSectionsWithErrors(errors);
    },
    isSectionWithErrors: (section: string) =>
      sectionsWithErrors.indexOf(section) >= 0,
    isSectionActive: (section: string) => activatedSections.includes(section),
    isSectionFocused: (section: string) => focusedSection === section,
    clearErrors: () => setSectionsWithErrors([]),
  };
};
