import { InputForm } from "../../../atoms/InputForm/InputForm.tsx";
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
        <InputForm
          label="First Name"
          placeholder="John"
          type="text"
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

        <InputForm
          label="Last Name"
          placeholder="Doe"
          type="text"
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
        <InputForm
          label="E-mail"
          placeholder="john.doe@gmail.com"
          type="text"
          inputFieldValue={driverRegistrationData.email}
          isMandatory={true}
          errorMessage={driverRegistrationError.email}
          saveInputData={(email: string) =>
            setObjectStringField(setDriverRegistrationData, "email", email)
          }
        />

        <InputForm
          label="Phone Number"
          placeholder="850-775-8717"
          type="text"
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
