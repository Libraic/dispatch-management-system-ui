import { DateSelector } from "../../../Common/Selector/DateSelector.tsx";
import React from "react";
import type { MileageData } from "../../../../types/internal/trucks-board/trucks-board-types.ts";

export const MileageFormDeliverablesDates: React.FC<{
  mileageData: MileageData;
}> = ({ mileageData }) => {
  return (
    <div className="flex flex-row gap-x-5">
      <DateSelector label="Pick Up Date" date={mileageData.pickUpDate} />
      <DateSelector label="Delivery Date" date={mileageData.deliveryDate} />
    </div>
  );
};
