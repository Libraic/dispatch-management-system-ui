import { PageHeader } from "../../../../global/PageHeader.tsx";
import { AddWorkload } from "./AddWorkload.tsx";

export const Workload = () => {
  return (
    <div>
      <PageHeader
        header="Workload"
        subheader="The working area of the employee"
      />
      <AddWorkload />
    </div>
  );
};
