import { TextualInputField } from "#/ui/InputField/components/public/TextualInputField";
import {
  NAME_PLACEHOLDER,
  PHONE_NUMBER_PLACEHOLDER,
} from "#/constants/common/placeholder-constants";
import { setObjectStringField } from "#/utils/registration/registration-utils";
import { formatPhoneNumber } from "#/shared/utils/inputField.utils";
import * as React from "react";
import type {
  DispatcherRegistrationData,
  DispatcherRegistrationErrorData,
} from "#/types/internal/dispatcher/dispatcher-registration-types";

type DispatcherRegistrationFormProps = {
  dispatcherRegistrationData: DispatcherRegistrationData;
  dispatcherRegistrationErrorData: DispatcherRegistrationErrorData;
  setDispatcherRegistrationData: React.Dispatch<
    React.SetStateAction<DispatcherRegistrationData>
  >;
};

export const DispatcherRegistrationForm: React.FC<
  DispatcherRegistrationFormProps
> = ({
  dispatcherRegistrationData,
  dispatcherRegistrationErrorData,
  setDispatcherRegistrationData,
}) => {
  return (
    <div className="flex items-center justify-center gap-x-[5rem]">
      <TextualInputField
        label="Name"
        placeholder={NAME_PLACEHOLDER}
        inputFieldValue={dispatcherRegistrationData.name}
        isMandatory={true}
        errorMessage={dispatcherRegistrationErrorData.name}
        saveInputData={(firstName: string) =>
          setObjectStringField(setDispatcherRegistrationData, "name", firstName)
        }
      />
      <TextualInputField
        label="Phone Number"
        placeholder={PHONE_NUMBER_PLACEHOLDER}
        inputFieldValue={dispatcherRegistrationData.phoneNumber}
        isMandatory={true}
        errorMessage={dispatcherRegistrationErrorData.phoneNumber}
        saveInputData={(phoneNumber: string) =>
          setObjectStringField(
            setDispatcherRegistrationData,
            "phoneNumber",
            formatPhoneNumber(phoneNumber),
          )
        }
      />
    </div>
  );
};
