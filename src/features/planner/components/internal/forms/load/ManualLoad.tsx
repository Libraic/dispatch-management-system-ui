import { LoadFormLoadLocations } from "./LoadFormLoadLocations/LoadFormLoadLocations";
import { LoadFormRevenue } from "./LoadFormRevenue";
import { LoadFormBrokerData } from "./LoadFormBrokerData";

export const ManualLoad = () => {
  return (
    <div className="w-full flex flex-col gap-y-[1.15rem]">
      <LoadFormLoadLocations />
      <LoadFormRevenue />
      <LoadFormBrokerData />
    </div>
  );
};
