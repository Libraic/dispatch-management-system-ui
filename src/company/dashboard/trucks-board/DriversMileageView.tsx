import * as React from "react";
import type { DriverWeeklyMileageData } from "../../../hooks/useDriverWeeklyMileage.ts";
import { DriverMileage } from "./DriverMileage.tsx";

export const DriversMileageView: React.FC<{
  driverWeeklyMileageData: DriverWeeklyMileageData;
}> = ({ driverWeeklyMileageData }) => {
  return (
    <>
      {driverWeeklyMileageData.currentDriversWeeklyMileage.map(
        (driverWeeklyMileage) => (
          <DriverMileage
            key={driverWeeklyMileage.itemIdentifier}
            driverWeeklyMileage={driverWeeklyMileage}
            driverWeeklyMileageData={driverWeeklyMileageData}
          />
        ),
      )}
    </>
  );
};
