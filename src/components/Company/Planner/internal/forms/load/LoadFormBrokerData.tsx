import React from "react";
import type {
  LoadData,
  LoadDataError,
} from "../../../../../../types/internal/planner/planner-types.ts";
import { TextualInputForm } from "../../../../../Common/InputForm/public/TextualInputForm.tsx";
import { setObjectStringField } from "../../../../../../utils/registration/registration-utils.ts";
import { BLANK_STRING } from "../../../../../../constants/common/global-constants.ts";
import type { StateData } from "../../../../../../types/internal/common/props-types.ts";
import { PHONE_NUMBER_PLACEHOLDER } from "../../../../../../constants/common/placeholder-constants.ts";
import { formatPhoneNumber } from "../../../../../../utils/global/input-form-utils.ts";

export const LoadFormBrokerData: React.FC<{
  loadStateData: StateData<LoadData, LoadDataError>;
}> = ({ loadStateData }) => {
  return (
    <div className="flex flex-row gap-x-5">
      <TextualInputForm
        label="Broker"
        placeholder="Degiro"
        inputFieldValue={loadStateData.data.broker}
        saveInputData={(broker: string) =>
          setObjectStringField(loadStateData.setData, "broker", broker)
        }
        isMandatory={true}
        errorMessage={loadStateData.error.brokerError}
        tailwindProperties={{ maxWeight: "max-w-[11.40rem]" }}
      />
      <TextualInputForm
        label="Representative"
        placeholder="C. H. Robinson"
        inputFieldValue={loadStateData.data.representative ?? BLANK_STRING}
        saveInputData={(representative: string) =>
          setObjectStringField(
            loadStateData.setData,
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
          loadStateData.data.representativeContactNumber ?? BLANK_STRING
        }
        saveInputData={(representativeContactNumber: string) =>
          setObjectStringField(
            loadStateData.setData,
            "representativeContactNumber",
            formatPhoneNumber(representativeContactNumber),
          )
        }
        tailwindProperties={{ maxWeight: "max-w-[11.40rem]" }}
        errorMessage={loadStateData.error.representativeContactNumberError}
      />
    </div>
  );
};
