import { UserRegistrationSection } from "./UserRegistrationSection.tsx";
import * as React from "react";
import type { SectionsHandler } from "../../hooks/useSections.ts";
import { USER_REGISTRATION_SECTIONS } from "../../types/registration/user/user-registration-data.ts";

export const UserRegistrationSectionsList: React.FC<{
  sectionsHandler: SectionsHandler;
}> = ({ sectionsHandler }) => {
  return (
    <div className="flex flex-col items-center gap-7 w-1/10 bg-[#212327] text-white p-6">
      <UserRegistrationSection
        sectionTitle="Basic Information"
        isSectionActive={sectionsHandler.isSectionActive(
          USER_REGISTRATION_SECTIONS.BASIC_INFORMATION,
        )}
        isSectionError={sectionsHandler.isSectionWithErrors(
          USER_REGISTRATION_SECTIONS.BASIC_INFORMATION,
        )}
        activateSection={() =>
          sectionsHandler.activateSection(
            USER_REGISTRATION_SECTIONS.BASIC_INFORMATION,
          )
        }
      />
      <UserRegistrationSection
        sectionTitle="Employment Information"
        isSectionActive={sectionsHandler.isSectionActive(
          USER_REGISTRATION_SECTIONS.EMPLOYMENT_INFORMATION,
        )}
        isSectionError={sectionsHandler.isSectionWithErrors(
          USER_REGISTRATION_SECTIONS.EMPLOYMENT_INFORMATION,
        )}
        activateSection={() =>
          sectionsHandler.activateSection(
            USER_REGISTRATION_SECTIONS.EMPLOYMENT_INFORMATION,
          )
        }
      />
      <UserRegistrationSection
        sectionTitle="Workload"
        isSectionActive={sectionsHandler.isSectionActive(
          USER_REGISTRATION_SECTIONS.WORKLOAD,
        )}
        isSectionError={sectionsHandler.isSectionWithErrors(
          USER_REGISTRATION_SECTIONS.WORKLOAD,
        )}
        activateSection={() =>
          sectionsHandler.activateSection(USER_REGISTRATION_SECTIONS.WORKLOAD)
        }
      />
      <UserRegistrationSection
        sectionTitle="Notes"
        isSectionActive={sectionsHandler.isSectionActive(
          USER_REGISTRATION_SECTIONS.NOTES,
        )}
        isSectionError={sectionsHandler.isSectionWithErrors(
          USER_REGISTRATION_SECTIONS.NOTES,
        )}
        activateSection={() =>
          sectionsHandler.activateSection(USER_REGISTRATION_SECTIONS.NOTES)
        }
      />
    </div>
  );
};
