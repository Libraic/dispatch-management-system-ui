import { RegistrationSectionHeader } from "../../../../global/RegistrationSectionHeader.tsx";
import { AccountData } from "./AccountData.tsx";
import { BirthData } from "./BirthData.tsx";
import { Information } from "../../../../global/Information.tsx";
import { useState } from "react";

export const BasicInformation = () => {
  const [shouldDisplayInformation, setShouldDisplayInformation] =
    useState(true);
  return (
    <>
      <RegistrationSectionHeader
        header="Personal Information"
        subheader="The personal data of the employee"
      />
      <AccountData setShouldDisplayInformation={setShouldDisplayInformation} />
      <BirthData />
      {shouldDisplayInformation && <Information />}
    </>
  );
};
