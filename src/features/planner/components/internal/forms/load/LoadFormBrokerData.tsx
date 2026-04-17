import { useContext } from "react";
import { TextualInputField } from "#/ui/InputField/components/public/TextualInputField";
import { setObjectStringField } from "#/utils/registration/registration-utils";
import { BLANK_STRING } from "#/constants/common/global-constants";
import { PHONE_NUMBER_PLACEHOLDER } from "#/constants/common/placeholder-constants";
import { formatPhoneNumber } from "#/shared/utils/inputField.formatter";
import { LoadContext } from "#/features/planner/context/LoadContext";

export const LoadFormBrokerData = () => {
  const loadContext = useContext(LoadContext)!!;
  return (
    <div className="flex flex-row gap-x-5">
      <TextualInputField
        label="Broker"
        placeholder="Degiro"
        inputFieldValue={loadContext.loadData.broker}
        saveInputData={(broker: string) =>
          setObjectStringField(loadContext.setLoadData, "broker", broker)
        }
        isMandatory={true}
        errorMessage={loadContext.loadDataErrors.brokerError}
        tailwindProperties={{ maxWeight: "max-w-[11.40rem]" }}
      />
      <TextualInputField
        label="Representative"
        placeholder="C. H. Robinson"
        inputFieldValue={loadContext.loadData.representative ?? BLANK_STRING}
        saveInputData={(representative: string) =>
          setObjectStringField(
            loadContext.setLoadData,
            "representative",
            representative,
          )
        }
        tailwindProperties={{ maxWeight: "max-w-[11.40rem]" }}
      />
      <TextualInputField
        label="Contact Number"
        placeholder={PHONE_NUMBER_PLACEHOLDER}
        inputFieldValue={
          loadContext.loadData.representativeContactNumber ?? BLANK_STRING
        }
        saveInputData={(representativeContactNumber: string) =>
          setObjectStringField(
            loadContext.setLoadData,
            "representativeContactNumber",
            formatPhoneNumber(representativeContactNumber),
          )
        }
        tailwindProperties={{ maxWeight: "max-w-[11.40rem]" }}
        errorMessage={
          loadContext.loadDataErrors.representativeContactNumberError
        }
      />
    </div>
  );
};
