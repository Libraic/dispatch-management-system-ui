import { RegistrationSectionHeader } from "../../RegistrationSectionHeader.tsx";
import { AccountData } from "./AccountData.tsx";
import { BirthData } from "./BirthData.tsx";
import { Information } from "../../../global/Information.tsx";
import { useState } from "react";
import { EmergencyContact } from "./EmergencyContact.tsx";

export const BasicInformation = () => {
  const [shouldDisplayInformation, setShouldDisplayInformation] =
    useState(true);
  return (
    <>
      <RegistrationSectionHeader
        header="Basic Information"
        subheader="The personal data of the employee"
      />
      <AccountData setShouldDisplayInformation={setShouldDisplayInformation} />
      <BirthData />
      <EmergencyContact />
      {shouldDisplayInformation && <Information />}
    </>
  );
};
