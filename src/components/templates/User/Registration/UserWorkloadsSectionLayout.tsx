import { WORKLOAD_HEADER } from "../../../../constants/common/header-constants.ts";
import { PageHeader } from "../../../organisms/Header/PageHeader.tsx";
import { UserWorkloads } from "../../../organisms/User/Registration/Sections/Workload/UserWorkloads.tsx";

export const UserWorkloadsSectionLayout = () => {
  return (
    <div>
      <PageHeader headerInfo={WORKLOAD_HEADER} />
      <UserWorkloads />
    </div>
  );
};
