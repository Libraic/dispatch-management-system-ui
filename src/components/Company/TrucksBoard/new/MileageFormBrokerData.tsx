import React from "react";
import type {
  MileageData,
  MileageDataError,
} from "../../../../types/internal/trucks-board/trucks-board-types.ts";
import { TextualInputForm } from "../../../Common/InputForm/public/TextualInputForm.tsx";
import { setObjectStringField } from "../../../../utils/registration/registration-utils.ts";
import { BLANK_STRING } from "../../../../constants/common/global-constants.ts";
import type { StateData } from "../../../../types/internal/common/props-types.ts";
import { PHONE_NUMBER_PLACEHOLDER } from "../../../../constants/common/placeholder-constants.ts";
import { formatPhoneNumber } from "../../../../utils/global/input-form-utils.ts";

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
        tailwindProperties={{ maxWeight: "max-w-[11.40rem]" }}
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
        tailwindProperties={{ maxWeight: "max-w-[11.40rem]" }}
      />
      <TextualInputForm
        label="Contact Number"
        placeholder={PHONE_NUMBER_PLACEHOLDER}
        inputFieldValue={
          mileageStateData.data.representativeContactNumber ?? BLANK_STRING
        }
        saveInputData={(representativeContactNumber: string) =>
          setObjectStringField(
            mileageStateData.setData,
            "representativeContactNumber",
            formatPhoneNumber(representativeContactNumber),
          )
        }
        tailwindProperties={{ maxWeight: "max-w-[11.40rem]" }}
        errorMessage={mileageStateData.error.representativeContactNumberError}
      />
    </div>
  );
};
