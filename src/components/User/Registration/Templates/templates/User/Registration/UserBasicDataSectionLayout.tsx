import { PageHeader } from "../../../../../../Common/Page/PageHeader.tsx";
import { BASIC_INFORMATION_HEADER } from "../../../../../../../constants/common/header-constants.ts";
import { UserBasicData } from "../../../../Sections/Basic/UserBasicData.tsx";
import { UserBirthData } from "../../../../Sections/Basic/UserBirthData.tsx";
import { MandatoryFieldDisclaimer } from "../../../../../../Common/Typography/MandatoryFieldDisclaimer.tsx";

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
