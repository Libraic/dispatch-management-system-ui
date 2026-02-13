import { TextualInputForm } from "../../../Common/InputForm/public/TextualInputForm.tsx";
import { useContext } from "react";
import { setObjectStringField } from "../../../../utils/registration/registration-utils.ts";
import { DriverRegistrationContext } from "../../../../context/DriverRegistrationContext.ts";

export const DriverGeneralDetailsSection = () => {
  const context = useContext(DriverRegistrationContext)!;
  const driverRegistrationData = context.registrationData;
  const driverRegistrationError = context.registrationDataError;
  const setDriverRegistrationData = context.setRegistrationData;
  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex flex-row gap-x-20">
        <TextualInputForm
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

        <TextualInputForm
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
        <TextualInputForm
          label="E-mail"
          placeholder="john.doe@gmail.com"
          inputFieldValue={driverRegistrationData.email}
          isMandatory={true}
          errorMessage={driverRegistrationError.email}
          saveInputData={(email: string) =>
            setObjectStringField(setDriverRegistrationData, "email", email)
          }
        />

        <TextualInputForm
          label="Phone Number"
          placeholder="850-775-8717"
          inputFieldValue={driverRegistrationData.phoneNumber}
          isMandatory={true}
          errorMessage={driverRegistrationError.phoneNumber}
          saveInputData={(phoneNumber: string) =>
            setObjectStringField(
              setDriverRegistrationData,
              "phoneNumber",
              phoneNumber,
            )
          }
        />
      </div>
    </div>
  );
};
