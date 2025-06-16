import { useState } from "react";
import { type SectionData, SectionEnum } from "../types/authentication.ts";

const allSections: SectionEnum[] = Object.keys(SectionEnum) as SectionEnum[];

/**
 * A custom hook that returns an object used to handle the Sections and store
 * information about their completeness, activeness and errors found during
 * their completion.
 *
 * A section is **focused** if it is the one that is rendered to the UI at the moment.
 *
 * A section is **active** if it was opened at some point during the completion of the registration form.
 *
 * A section is **complete** if all the forms were completed as per the requirements.
 *
 * A section has **errors** if some fields do not meet the requirements after completion.
 *
 * Initially, the **Basic Information** section is active. If the user completes it correctly,
 * the next section will be opened (made active). If not, it will be considered as a
 * section with errors; hence, the next one will not be available until the user does
 * not fix all the errors. If the user switches to a previous section that was completed and
 * changes some data so that it becomes a section with errors, unlocking a new section
 * will not be possible until the user resolves all errors. If the user completed a section,
 * and it has no errors but did not press the **Continue** button and switched to a previous one,
 * where some data was modified, the Section that has no errors will be marked as **completed**.
 */
export const useSectionsHandler = (): SectionData => {
  const [focusedSection, setFocusedSection] = useState<SectionEnum>(
    SectionEnum.BASIC_INFORMATION,
  );
  const [sectionsWithErrors, setSectionsWithErrors] = useState<SectionEnum[]>(
    [],
  );
  const [sectionsCompleted, setSectionsCompleted] = useState<SectionEnum[]>([]);
  const [sectionsActive, setSectionsActive] = useState<SectionEnum[]>([
    SectionEnum.BASIC_INFORMATION,
  ]);

  return {
    next: () => {
      setSectionsActive((prev) => {
        // Remove the errors for all Sections
        setSectionsWithErrors([]);

        // If the next() method is called, it means no errors were found on any
        // active section. This means that all the active sections will be
        // treated as completed, because the User willingly clicked on the
        // Continue button.
        const completed: SectionEnum[] = [];
        for (const s of allSections) {
          if (prev.indexOf(s) >= 0 || completed.indexOf(s) >= 0) {
            completed.push(s);
          }
        }

        setSectionsCompleted(completed);

        // We take the index of the last completed section, so we can advance
        // to the next section.
        const indexOfLastCompletedSection = allSections.indexOf(
          allSections[completed.length - 1],
        );

        // When all the sections are completed, we will have a dedicated approach,
        // namely to send the data to the backend. This will be rewritten.
        const focused =
          indexOfLastCompletedSection === allSections.length - 1
            ? allSections[indexOfLastCompletedSection]
            : allSections[indexOfLastCompletedSection + 1];
        setFocusedSection(focused);

        // The active sections are basically the previously completed one and
        // the new focused one.
        return [...completed, focused];
      });
    },
    setErrors: (sectionsWithErrors: SectionEnum[]) => {
      // The sections that are completed are basically the sections that were
      // completed previously and have no errors.
      const completed: SectionEnum[] = [];
      for (const s of allSections) {
        if (sectionsWithErrors.indexOf(s) < 0) {
          completed.push(s);
        }
      }
      setSectionsCompleted(completed);

      // The focused section will be the first one from the list of sections with errors.
      setFocusedSection(sectionsWithErrors[0]);

      // Set the new Sections with Errors
      setSectionsWithErrors(sectionsWithErrors);
    },
    removeError: (section: SectionEnum) =>
      setSectionsWithErrors((prev) => {
        const completed: SectionEnum[] = [];
        for (const s of allSections) {
          if (s === section || sectionsCompleted.indexOf(s) >= 0) {
            completed.push(s);
          }
        }
        setSectionsCompleted(completed);
        return prev.filter((s) => s !== section);
      }),
    isSectionWithErrors: (section: SectionEnum) =>
      sectionsWithErrors.indexOf(section) >= 0,
    setFocusedSection: (section: SectionEnum) => {
      if (sectionsActive.indexOf(section) >= 0) {
        setFocusedSection(section);
      }
    },
    getActiveSection: () => focusedSection,
    isSectionComplete: (section: SectionEnum) =>
      sectionsCompleted.indexOf(section) >= 0,
    isSectionActive: (section: SectionEnum) =>
      sectionsActive.indexOf(section) >= 0,
    isSectionFocused: (section: SectionEnum) => focusedSection === section,
    areAllSectionsComplete: () => {
      for (const section of allSections) {
        if (!sectionsCompleted.includes(section)) {
          return false;
        }
      }
      return true;
    },
  };
};
