import { RegistrationSectionHeader } from "../../RegistrationSectionHeader.tsx";
import { AddWorkload } from "./AddWorkload.tsx";

export const Workload = () => {
  return (
    <div>
      <RegistrationSectionHeader
        header="Workload"
        subheader="The working area of the employee"
      />
      <AddWorkload />
    </div>
  );
};
