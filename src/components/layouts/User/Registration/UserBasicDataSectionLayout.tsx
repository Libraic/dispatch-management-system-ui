import { PageHeader } from "../../../organisms/Header/PageHeader.tsx";
import { BASIC_INFORMATION_HEADER } from "../../../../constants/common/header-constants.ts";
import { UserBasicData } from "../../../organisms/User/Registration/Sections/Basic/UserBasicData.tsx";
import { UserBirthData } from "../../../organisms/User/Registration/Sections/Basic/UserBirthData.tsx";
import { MandatoryFieldDisclaimer } from "../../../atoms/Typography/MandatoryFieldDisclaimer.tsx";

export const UserBasicDataSectionLayout = () => {
  return (
    <>
      <PageHeader headerInfo={BASIC_INFORMATION_HEADER} />
      <UserBasicData />
      <UserBirthData />
      <MandatoryFieldDisclaimer />
    </>
  );
};
