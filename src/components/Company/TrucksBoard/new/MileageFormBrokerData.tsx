import React from "react";
import type {
  MileageData,
  MileageDataError,
} from "../../../../types/internal/trucks-board/trucks-board-types.ts";
import { TextualInputForm } from "../../../Common/InputForm/public/TextualInputForm.tsx";
import { setObjectStringField } from "../../../../utils/registration/registration-utils.ts";
import { BLANK_STRING } from "../../../../constants/common/global-constants.ts";
import type { StateData } from "../../../../types/internal/common/props-types.ts";

export const MileageFormBrokerData: React.FC<{
  mileageStateData: StateData<MileageData, MileageDataError>;
}> = ({ mileageStateData }) => {
  return (
    <div className="flex flex-row gap-x-5">
      <TextualInputForm
        label="Broker"
        placeholder="Degiro"
        inputFieldValue={mileageStateData.data.broker}
        saveInputData={(broker: string) =>
          setObjectStringField(mileageStateData.setData, "broker", broker)
        }
        isMandatory={true}
        errorMessage={mileageStateData.error.brokerError}
      />
      <TextualInputForm
        label="Representative"
        placeholder="C. H. Robinson"
        inputFieldValue={mileageStateData.data.representative ?? BLANK_STRING}
        saveInputData={(representative: string) =>
          setObjectStringField(
            mileageStateData.setData,
            "representative",
            representative,
          )
        }
      />
    </div>
  );
};
