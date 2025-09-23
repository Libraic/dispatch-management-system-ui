import { PageHeader } from "../../../../global/PageHeader.tsx";
import { AddWorkload } from "./AddWorkload.tsx";
import { WORKLOAD_HEADER } from "../../../../utils/constants/headers.ts";

export const Workload = () => {
  return (
    <div>
      <PageHeader headerInfo={WORKLOAD_HEADER} />
      <AddWorkload />
    </div>
  );
};
