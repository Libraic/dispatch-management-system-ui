import { TextualInputField } from "#/ui/InputField/components/public/TextualInputField";
import { useContext } from "react";
import { setObjectStringField } from "#/utils/registration/registration-utils";
import { PHONE_NUMBER_PLACEHOLDER } from "#/constants/common/placeholder-constants";
import { DriverRegistrationContext } from "#/features/drivers/context/DriverRegistrationContext";
import { formatPhoneNumber } from "#/shared/utils/inputField.utils";

export const DriverBasicInfoSection = () => {
  const context = useContext(DriverRegistrationContext)!;
  const driverRegistrationData = context.registrationData;
  const driverRegistrationError = context.registrationDataError;
  const setDriverRegistrationData = context.setRegistrationData;
  return (
    <div className="grid grid-cols-2 gap-x-20 gap-y-5">
      <TextualInputField
        label="First Name"
        placeholder="John"
        inputFieldValue={driverRegistrationData.firstName}
        isMandatory={true}
        errorMessage={driverRegistrationError.firstName}
        saveInputData={(firstName: string) =>
          setObjectStringField(
            setDriverRegistrationData,
            "firstName",
            firstName,
          )
        }
      />

      <TextualInputField
        label="Last Name"
        placeholder="Doe"
        inputFieldValue={driverRegistrationData.lastName}
        isMandatory={true}
        errorMessage={driverRegistrationError.lastName}
        saveInputData={(lastName: string) =>
          setObjectStringField(setDriverRegistrationData, "lastName", lastName)
        }
      />

      <TextualInputField
        label="E-mail"
        placeholder="john.doe@gmail.com"
        inputFieldValue={driverRegistrationData.email}
        isMandatory={true}
        errorMessage={driverRegistrationError.email}
        saveInputData={(email: string) =>
          setObjectStringField(setDriverRegistrationData, "email", email)
        }
      />

      <TextualInputField
        label="Phone Number"
        placeholder={PHONE_NUMBER_PLACEHOLDER}
        inputFieldValue={driverRegistrationData.phoneNumber}
        isMandatory={true}
        errorMessage={driverRegistrationError.phoneNumber}
        saveInputData={(phoneNumber: string) =>
          setObjectStringField(
            setDriverRegistrationData,
            "phoneNumber",
            formatPhoneNumber(phoneNumber),
          )
        }
      />
    </div>
  );
};
