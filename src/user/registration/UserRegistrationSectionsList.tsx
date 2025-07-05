import { UserRegistrationSection } from "./UserRegistrationSection.tsx";
import * as React from "react";
import {
  type SectionData,
  SectionEnum,
} from "../../types/registration/user/section.ts";

export const UserRegistrationSectionsList: React.FC<{
  sectionsHandler: SectionData;
}> = ({ sectionsHandler }) => {
  return (
    <div className="flex flex-col items-center gap-7 w-1/10 bg-[#212327] text-white p-6">
      <UserRegistrationSection
        sectionTitle="Basic Information"
        setFocusedSection={() => {
          sectionsHandler.setFocusedSection(SectionEnum.BASIC_INFORMATION);
        }}
        isSectionComplete={sectionsHandler.isSectionComplete(
          SectionEnum.BASIC_INFORMATION,
        )}
        isSectionActive={sectionsHandler.isSectionActive(
          SectionEnum.BASIC_INFORMATION,
        )}
        isSectionError={sectionsHandler.isSectionWithErrors(
          SectionEnum.BASIC_INFORMATION,
        )}
        isSectionFocused={sectionsHandler.isSectionFocused(
          SectionEnum.BASIC_INFORMATION,
        )}
      />
      <UserRegistrationSection
        sectionTitle="Employment Information"
        setFocusedSection={() => {
          sectionsHandler.setFocusedSection(SectionEnum.EMPLOYMENT_INFORMATION);
        }}
        isSectionComplete={sectionsHandler.isSectionComplete(
          SectionEnum.EMPLOYMENT_INFORMATION,
        )}
        isSectionActive={sectionsHandler.isSectionActive(
          SectionEnum.EMPLOYMENT_INFORMATION,
        )}
        isSectionError={sectionsHandler.isSectionWithErrors(
          SectionEnum.EMPLOYMENT_INFORMATION,
        )}
        isSectionFocused={sectionsHandler.isSectionFocused(
          SectionEnum.EMPLOYMENT_INFORMATION,
        )}
      />
      <UserRegistrationSection
        sectionTitle="Workload"
        setFocusedSection={() => {
          sectionsHandler.setFocusedSection(SectionEnum.WORKLOAD);
        }}
        isSectionComplete={sectionsHandler.isSectionComplete(
          SectionEnum.WORKLOAD,
        )}
        isSectionActive={sectionsHandler.isSectionActive(SectionEnum.WORKLOAD)}
        isSectionError={sectionsHandler.isSectionWithErrors(
          SectionEnum.WORKLOAD,
        )}
        isSectionFocused={sectionsHandler.isSectionFocused(
          SectionEnum.WORKLOAD,
        )}
      />
      <UserRegistrationSection
        sectionTitle="Notes"
        setFocusedSection={() => {
          sectionsHandler.setFocusedSection(SectionEnum.NOTES);
        }}
        isSectionComplete={sectionsHandler.isSectionComplete(SectionEnum.NOTES)}
        isSectionActive={sectionsHandler.isSectionActive(SectionEnum.NOTES)}
        isSectionError={sectionsHandler.isSectionWithErrors(SectionEnum.NOTES)}
        isSectionFocused={sectionsHandler.isSectionFocused(SectionEnum.NOTES)}
      />
    </div>
  );
};
