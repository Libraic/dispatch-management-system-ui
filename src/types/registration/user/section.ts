export const SectionEnum = {
  BASIC_INFORMATION: "BASIC_INFORMATION",
  EMPLOYMENT_INFORMATION: "EMPLOYMENT_INFORMATION",
  WORKLOAD: "WORKLOAD",
  NOTES: "NOTES",
} as const;

export type SectionEnum = keyof typeof SectionEnum;

export type SectionData = {
  next: () => void;
  setErrors: (sectionsWithErrors: SectionEnum[]) => void;
  removeError: (sectionEnum: SectionEnum) => void;
  isSectionWithErrors: (sectionEnum: SectionEnum) => boolean;
  setFocusedSection: (sectionEnum: SectionEnum) => void;
  getActiveSection: () => SectionEnum;
  isSectionComplete: (sectionEnum: SectionEnum) => boolean;
  isSectionActive: (sectionEnum: SectionEnum) => boolean;
  isSectionFocused: (sectionEnum: SectionEnum) => boolean;
  areAllSectionsComplete: () => boolean;
};
