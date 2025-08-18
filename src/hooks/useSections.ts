import { useState } from "react";

export type SectionsHandler = {
  activateSection: (section: string) => void;
  getActiveSection: () => string;
  getSectionsWithErrors: () => Map<string, boolean>;
  setErrors: (errors: Map<string, boolean>) => void;
  isSectionWithErrors: (section: string) => boolean;
  isSectionActive: (section: string) => boolean;
  clearErrors: () => void;
};

export const useSections = (sections: string[]): SectionsHandler => {
  const [activeSection, setActiveSection] = useState<string>(sections[0]);
  const [sectionsWithErrors, setSectionsWithErrors] = useState<
    Map<string, boolean>
  >(new Map<string, boolean>());
  return {
    activateSection: (section: string) => setActiveSection(section),
    getActiveSection: () => activeSection,
    getSectionsWithErrors: () => sectionsWithErrors,
    setErrors: (errors: Map<string, boolean>) => {
      if (errors.size !== 0) {
        setActiveSection(errors.keys().next().value!);
      }
      setSectionsWithErrors(errors);
    },
    isSectionWithErrors: (section: string) =>
      sectionsWithErrors.get(section) ?? false,
    isSectionActive: (section: string) => activeSection === section,
    clearErrors: () => setSectionsWithErrors(new Map<string, boolean>()),
  };
};
