import * as React from "react";
import { AssetTypeEnum } from "../../../types/assets/asset-data.ts";

const GRAY_COLOR = "text-[#6f6f6f]";

export const AssetCreationFormSelector: React.FC<{
  assetType: AssetTypeEnum;
  setActiveCreationForm: (assetTypeEnum: AssetTypeEnum) => void;
}> = ({ assetType, setActiveCreationForm }) => {
  const truckComponentColor =
    assetType === AssetTypeEnum.TRUCK ? "text-light-blue" : GRAY_COLOR;
  const trailerComponentColor =
    assetType === AssetTypeEnum.TRAILER ? "text-light-blue" : GRAY_COLOR;
  return (
    <div className="flex flex-row gap-x-6 mt-10">
      <p
        className={`font-lato ${truckComponentColor} hover:cursor-pointer hover:text-light-blue`}
        onClick={() => setActiveCreationForm(AssetTypeEnum.TRUCK)}
      >
        Truck
      </p>
      <p className={`${GRAY_COLOR}`}>|</p>
      <p
        className={`font-lato ${trailerComponentColor} hover:cursor-pointer hover:text-light-blue`}
        onClick={() => setActiveCreationForm(AssetTypeEnum.TRAILER)}
      >
        Trailer
      </p>
    </div>
  );
};
