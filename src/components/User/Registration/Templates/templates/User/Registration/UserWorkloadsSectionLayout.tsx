import { WORKLOAD_HEADER } from "../../../../../../../constants/common/header-constants.ts";
import { PageHeader } from "../../../../../../Common/Page/PageHeader.tsx";
import { UserWorkloads } from "../../../../Sections/Workload/UserWorkloads.tsx";

export const UserWorkloadsSectionLayout = () => {
  return (
    <div>
      <PageHeader headerInfo={WORKLOAD_HEADER} />
      <UserWorkloads />
    </div>
  );
};
