import { TextualInputField } from "../../../Common/InputForm/public/TextualInputField.tsx";
import { useContext } from "react";
import { setObjectStringField } from "../../../../utils/registration/registration-utils.ts";
import { DriverRegistrationContext } from "../../../../context/DriverRegistrationContext.ts";
import { PHONE_NUMBER_PLACEHOLDER } from "../../../../constants/common/placeholder-constants.ts";
import { formatPhoneNumber } from "../../../../utils/global/input-form-utils.ts";

export const DriverGeneralDetailsSection = () => {
  const context = useContext(DriverRegistrationContext)!;
  const driverRegistrationData = context.registrationData;
  const driverRegistrationError = context.registrationDataError;
  const setDriverRegistrationData = context.setRegistrationData;
  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex flex-row gap-x-20">
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
            setObjectStringField(
              setDriverRegistrationData,
              "lastName",
              lastName,
            )
          }
        />
      </div>
      <div className="flex flex-row gap-x-20 mt-20">
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
    </div>
  );
};
