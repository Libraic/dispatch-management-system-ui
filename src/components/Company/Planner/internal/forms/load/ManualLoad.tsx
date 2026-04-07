import { LoadFormLoadLocations } from "./LoadFormLoadLocations.tsx";
import { LoadFormRevenue } from "./LoadFormRevenue.tsx";
import { LoadFormBrokerData } from "./LoadFormBrokerData.tsx";
import type { StateData } from "../../../../../../types/internal/common/props-types.ts";
import type {
  LoadData,
  LoadDataError,
} from "../../../../../../types/internal/planner/planner-types.ts";
import React from "react";

export const ManualLoad: React.FC<{
  loadStateData: StateData<LoadData, LoadDataError>;
}> = ({ loadStateData }) => {
  return (
    <div className="w-full flex flex-col gap-y-[1.15rem]">
      <LoadFormLoadLocations loadStateData={loadStateData} />
      <LoadFormRevenue loadStateData={loadStateData} />
      <LoadFormBrokerData loadStateData={loadStateData} />
    </div>
  );
};
