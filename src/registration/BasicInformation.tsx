import { InputForm } from "./InputForm.tsx";
import { BirthDateForm } from "./BirthDateForm.tsx";
import type {
  RegistrationData,
  RegistrationDataError,
} from "../types/authentication.ts";
import * as React from "react";
import { RegistrationSectionHeader } from "./RegistrationSectionHeader.tsx";
import { SectionDivision } from "./SectionDivision.tsx";

export const BasicInformation: React.FC<{
  registrationData: RegistrationData;
  registrationDataError: RegistrationDataError;
  setRegistrationData: (registrationData: RegistrationData) => void;
}> = ({ registrationData, registrationDataError, setRegistrationData }) => {
  const [isAccountDataExpanded, setIsAccountDataExpanded] =
    React.useState(true);
  const [isBirthDataExpanded, setIsBirthDataExpanded] = React.useState(true);
  const [isEmploymentDataExpanded, setIsEmploymentDataExpanded] =
    React.useState(true);
  return (
    <>
      <RegistrationSectionHeader
        header="Basic Information"
        subheader="The personal data of the employee"
      />
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
      <SectionDivision
        division="Birth Data"
        isExpanded={isBirthDataExpanded}
        setIsExpanded={setIsBirthDataExpanded}
      />
      {isBirthDataExpanded && (
        <div className="flex gap-x-11 mb-5">
          <BirthDateForm />
        </div>
      )}
      <SectionDivision
        division="Employment Data"
        isExpanded={isEmploymentDataExpanded}
        setIsExpanded={setIsEmploymentDataExpanded}
      />
      {isEmploymentDataExpanded && (
        <div className="flex gap-x-11 mb-5">
          <BirthDateForm />
        </div>
      )}
    </>
  );
};
