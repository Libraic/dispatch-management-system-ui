import { PageHeader } from "../../../../../../Common/Page/PageHeader.tsx";
import { EMPLOYMENT_INFORMATION_HEADER } from "../../../../../../../constants/common/header-constants.ts";
import { UserEmploymentDate } from "../../../../Sections/Employment/UserEmploymentDate.tsx";
import { UserEmploymentStatus } from "../../../../Sections/Employment/UserEmploymentStatus.tsx";

export const UserEmploymentSectionLayout = () => {
  return (
    <div>
      <PageHeader headerInfo={EMPLOYMENT_INFORMATION_HEADER} />
      <div className="flex flex-col gap-y-15">
        <UserEmploymentDate />
        <UserEmploymentStatus />
      </div>
    </div>
  );
};
