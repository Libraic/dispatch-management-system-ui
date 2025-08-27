import { PageHeader } from "../../../../global/PageHeader.tsx";
import { AccountData } from "./AccountData.tsx";
import { BirthData } from "./BirthData.tsx";
import { MandatoryFieldDisclaimer } from "../../../../global/MandatoryFieldDisclaimer.tsx";

export const BasicInformation = () => {
  return (
    <>
      <PageHeader
        header="Personal Information"
        subheader="The personal data of the employee"
      />
      <AccountData />
      <BirthData />
      <MandatoryFieldDisclaimer />
    </>
  );
};
