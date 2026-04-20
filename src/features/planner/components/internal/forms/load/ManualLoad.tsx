import { LoadFormLoadLocations } from "./LoadFormLoadLocations/LoadFormLoadLocations";
import { LoadFormRevenue } from "./LoadFormRevenue";
import { LoadFormBrokerData } from "./LoadFormBrokerData";
import { LoadMetadata } from "#/features/planner/components/internal/forms/load/LoadMetadata";

export const ManualLoad = () => {
  return (
    <div className="w-full flex flex-col gap-y-[1.15rem]">
      <LoadMetadata />
      <LoadFormLoadLocations />
      <LoadFormRevenue />
      <LoadFormBrokerData />
    </div>
  );
};
