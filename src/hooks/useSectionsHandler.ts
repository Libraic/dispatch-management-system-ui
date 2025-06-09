import { useState } from "react";
import { type SectionData, SectionEnum } from "../types/authentication.ts";

/**
 * A custom hook that manages the state for navigating and controlling sections in an application.
 *
 * **index** - an internal variable used as the position of the current Section enum
 * in the overall Section enums array
 *
 * **focusedSection** - the Section currently rendered on UI
 *
 * **completedSections** - a map that holds the information about what Sections
 * were fully completed
 *
 * **activeSections** - a map that holds the information about what Sections are
 * navigable. The section n is made available once the section n-1 was fully completed
 * (without errors). Once a section was completed, the user can go back and modify some
 * data, which can cause errors. This will not make the active sections inactive,
 * just incomplete.
 *
 * **errors** - a map that holds the information about what Sections have erroneous data.
 *
 * @returns {SectionData} The state management methods and utilities for handling sections.
 */
export const useSectionsHandler = (): SectionData => {
  const [index, setIndex] = useState(0);
  const [focusedSection, setFocusedSection] = useState<SectionEnum>(
    SectionEnum.BASIC_INFORMATION,
  );

  // TODO: Consider having a single Map that will have an object containing all three booleans
  const [completedSections, setCompletedSections] = useState<
    Map<SectionEnum, boolean>
  >(
    () =>
      new Map<SectionEnum, boolean>([
        [SectionEnum.BASIC_INFORMATION, false],
        [SectionEnum.EMPLOYMENT_INFORMATION, false],
        [SectionEnum.WORKLOAD, false],
        [SectionEnum.NOTES, false],
      ]),
  );
  const [activeSections, setActiveSections] = useState<
    Map<SectionEnum, boolean>
  >(
    () =>
      new Map<SectionEnum, boolean>([
        [SectionEnum.BASIC_INFORMATION, true],
        [SectionEnum.EMPLOYMENT_INFORMATION, false],
        [SectionEnum.WORKLOAD, false],
        [SectionEnum.NOTES, false],
      ]),
  );

  const [errors, setErrors] = useState<Map<SectionEnum, boolean>>(
    () =>
      new Map<SectionEnum, boolean>([
        [SectionEnum.BASIC_INFORMATION, false],
        [SectionEnum.EMPLOYMENT_INFORMATION, false],
        [SectionEnum.WORKLOAD, false],
        [SectionEnum.NOTES, false],
      ]),
  );

  const getFirstIncompleteSectionIndex = () => {
    const values = [...completedSections.values()];
    for (let i = 0; i < values.length; i++) {
      if (i !== index && !values[i]) {
        return i;
      }
    }

    return values.length - 1;
  };

  return {
    next: () => {
      setIndex((prevIndex) => {
        const values = Object.values(SectionEnum);
        const isCurrentSectionWithErrors = errors.get(focusedSection) ?? false;
        const newIndex = isCurrentSectionWithErrors
          ? getFirstIncompleteSectionIndex()
          : prevIndex === values.length - 1
            ? 0
            : prevIndex + 1;
        const newSection = values[newIndex];

        setErrors((prev) => {
          const updated = new Map(prev);
          updated.set(focusedSection, false);
          return updated;
        });

        setFocusedSection(newSection as SectionEnum);

        setCompletedSections((prev) => {
          const updated = new Map(prev);
          updated.set(values[prevIndex] as SectionEnum, true);
          return updated;
        });

        setActiveSections((prev) => {
          const updated = new Map(prev);
          updated.set(newSection as SectionEnum, true);
          return updated;
        });

        return newIndex;
      });
    },
    setError: (section: SectionEnum) => {
      setErrors((prev) => {
        setCompletedSections((prev) => {
          const updated = new Map(prev);
          updated.set(section as SectionEnum, false);
          return updated;
        });
        setFocusedSection(section);
        const updated = new Map(prev);
        updated.set(section, true);
        return updated;
      });
    },
    isSectionWithErrors: (section: SectionEnum) => errors.get(section) ?? false,
    setFocusedSection: (section: SectionEnum) => {
      if (activeSections.get(section) ?? false) {
        setFocusedSection(section);
        const values = Object.values(SectionEnum);
        setIndex(values.indexOf(section));
      }
    },
    getActiveSection: () => focusedSection,
    isSectionComplete: (section: SectionEnum) =>
      completedSections.get(section) ?? false,
    isSectionActive: (section: SectionEnum) =>
      activeSections.get(section) ?? false,
  };
};
