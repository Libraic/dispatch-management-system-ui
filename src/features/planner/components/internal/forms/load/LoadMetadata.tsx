import { setObjectStringField } from "#/utils/registration/registration-utils";
import { TextualInputField } from "#/ui/InputField/components/public/TextualInputField";
import { useContext } from "react";
import { LoadContext } from "#/features/planner/context/LoadContext";

export const LoadMetadata = () => {
  const loadContext = useContext(LoadContext)!!;
  return (
    <div>
      <TextualInputField
        label="Load #"
        placeholder="115840"
        inputFieldValue={loadContext.loadData.loadNumber}
        saveInputData={(loadNumber: string) =>
          setObjectStringField(
            loadContext.setLoadData,
            "loadNumber",
            loadNumber,
          )
        }
        isMandatory={true}
        errorMessage={loadContext.loadDataErrors.loadNumberError}
        tailwindProperties={{ maxWeight: "max-w-[11.40rem]" }}
      />
    </div>
  );
};
