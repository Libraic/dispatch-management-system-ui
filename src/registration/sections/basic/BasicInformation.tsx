import { RegistrationSectionHeader } from "../../RegistrationSectionHeader.tsx";
import { AccountData } from "./AccountData.tsx";
import { BirthData } from "./BirthData.tsx";
import { Information } from "../../../global/Information.tsx";

export const BasicInformation = () => {
  return (
    <>
      <RegistrationSectionHeader
        header="Basic Information"
        subheader="The personal data of the employee"
      />
      <AccountData />
      <BirthData />
      <Information />
    </>
  );
};
