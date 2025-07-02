import { InputForm } from "../../global/InputForm.tsx";
import type {
  DriverRegistrationData,
  DriverRegistrationError,
} from "../../types/registration/driver/driver-registration-types.ts";
import * as React from "react";
import { setObjectStringField } from "../../utils/registration/registration-utils.ts";

export const GeneralDetailsSection: React.FC<{
  driverRegistrationData: DriverRegistrationData;
  driverRegistrationError: DriverRegistrationError;
  setDriverRegistrationData: React.Dispatch<
    React.SetStateAction<DriverRegistrationData>
  >;
}> = ({
  driverRegistrationData,
  driverRegistrationError,
  setDriverRegistrationData,
}) => {
  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex flex-row gap-x-20">
        <InputForm
          label="First Name"
          placeholder="John"
          type="text"
          name="name"
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
          name="name"
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
          name="name"
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
          name="name"
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
