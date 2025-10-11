import { InputForm } from "../../../global/input-forms/InputForm.tsx";
import { useContext } from "react";
import { setObjectStringField } from "../../../utils/registration/registration-utils.ts";
import { DriverRegistrationContext } from "../../../context/DriverRegistrationContext.ts";
import { LiveSearchInputForm } from "../../../global/live-search/LiveSearchInputForm.tsx";
import { LiveSearchKey } from "../../../types/forms.ts";
import type { Renderable } from "../../../types/api/Renderable.ts";
import { BLANK_STRING } from "../../../utils/constants/global-constants.ts";
import { Truck } from "../../../types/api/Truck.ts";
import { Trailer } from "../../../types/api/Trailer.ts";

export const GeneralDetailsSection = () => {
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
      <div className="flex flex-row gap-x-20 mt-20">
        <LiveSearchInputForm
          label="Truck"
          placeholder={"RK-2021"}
          value={driverRegistrationData.truckNumber}
          searchKey={LiveSearchKey.TRUCK}
          saveData={(truckData: Renderable) =>
            setObjectStringField(
              setDriverRegistrationData,
              "truckNumber",
              truckData.renderOnForm(),
            )
          }
          cleanData={() =>
            setDriverRegistrationData({
              ...driverRegistrationData,
              truckNumber: BLANK_STRING,
            })
          }
          constructor={Truck}
        />
        <LiveSearchInputForm
          label="Trailer"
          placeholder={"TK-2013"}
          value={driverRegistrationData.trailerNumber}
          searchKey={LiveSearchKey.TRAILER}
          saveData={(trailerData: Renderable) =>
            setObjectStringField(
              setDriverRegistrationData,
              "trailerNumber",
              trailerData.renderOnForm(),
            )
          }
          cleanData={() =>
            setDriverRegistrationData({
              ...driverRegistrationData,
              trailerNumber: BLANK_STRING,
            })
          }
          constructor={Trailer}
        />
      </div>
    </div>
  );
};
