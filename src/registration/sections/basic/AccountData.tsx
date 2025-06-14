import { SectionDivision } from "../SectionDivision.tsx";
import { InputForm } from "../../../global/InputForm.tsx";
import * as React from "react";
import { useContext } from "react";
import { RegistrationContext } from "../../../context/RegistrationContext.ts";

export const AccountData: React.FC<{
  setShouldDisplayInformation: (value: boolean) => void;
}> = ({ setShouldDisplayInformation }) => {
  const [isAccountDataExpanded, setIsAccountDataExpanded] =
    React.useState(true);
  const context = useContext(RegistrationContext)!;

  const { registrationData, registrationDataError, setRegistrationData } =
    context;

  setShouldDisplayInformation(isAccountDataExpanded);

  return (
    <>
      <SectionDivision
        division="Account Data"
        isExpanded={isAccountDataExpanded}
        setIsExpanded={setIsAccountDataExpanded}
      />
      {isAccountDataExpanded && (
        <>
          <div className="flex gap-5.5 mb-10">
            <InputForm
              label="First Name"
              placeholder="John"
              type="text"
              name="first-name"
              inputFieldValue={registrationData.firstName}
              isMandatory={true}
              errorText={registrationDataError.firstNameError}
              saveData={(value: string) => {
                setRegistrationData((prev) => ({
                  ...prev,
                  firstName: value,
                }));
              }}
            />
            <InputForm
              label="Last Name"
              placeholder="Doe"
              type="text"
              name="last-name"
              inputFieldValue={registrationData.lastName}
              isMandatory={true}
              errorText={registrationDataError.lastNameError}
              saveData={(value: string) => {
                setRegistrationData((prev) => ({
                  ...prev,
                  lastName: value,
                }));
              }}
            />
            <InputForm
              label="E-mail"
              placeholder="john.doe@domain.com"
              type="email"
              name="email"
              inputFieldValue={registrationData.email}
              isMandatory={true}
              errorText={registrationDataError.emailError}
              saveData={(value: string) => {
                setRegistrationData((prev) => ({
                  ...prev,
                  email: value,
                }));
              }}
            />
          </div>
          <div className="flex gap-x-5.5 mb-10">
            <InputForm
              label="Password"
              placeholder="********"
              type="password"
              name="password"
              inputFieldValue={registrationData.password}
              isMandatory={true}
              errorText={registrationDataError.passwordError}
              saveData={(value: string) => {
                setRegistrationData((prev) => ({
                  ...prev,
                  password: value,
                }));
              }}
            />
            <InputForm
              label="Confirm Password"
              placeholder="********"
              type="password"
              name="confirm-password"
              inputFieldValue={registrationData.confirmPassword}
              isMandatory={true}
              errorText=""
              saveData={(value: string) => {
                setRegistrationData((prev) => ({
                  ...prev,
                  confirmPassword: value,
                }));
              }}
            />
          </div>
          <div className="flex gap-x-5.5 mb-10">
            <InputForm
              label="Personal E-mail"
              placeholder="john.doe@domain.com"
              type="email"
              name="email"
              inputFieldValue={registrationData.personalEmail}
              isMandatory={false}
              errorText={registrationDataError.personalEmailError}
              saveData={(value: string) => {
                setRegistrationData((prev) => ({
                  ...prev,
                  personalEmail: value,
                }));
              }}
            />
          </div>
        </>
      )}
    </>
  );
};
