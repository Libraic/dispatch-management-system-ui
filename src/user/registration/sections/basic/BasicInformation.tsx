import { PageHeader } from "../../../../global/PageHeader.tsx";
import { AccountData } from "./AccountData.tsx";
import { BirthData } from "./BirthData.tsx";
import { MandatoryFieldDisclaimer } from "../../../../global/MandatoryFieldDisclaimer.tsx";
import { BASIC_INFORMATION_HEADER } from "../../../../utils/constants/headers.ts";

export const BasicInformation = () => {
  return (
    <>
      <PageHeader headerInfo={BASIC_INFORMATION_HEADER} />
      <AccountData />
      <BirthData />
      <MandatoryFieldDisclaimer />
    </>
  );
};
