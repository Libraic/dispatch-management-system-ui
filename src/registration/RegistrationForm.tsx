import { RegistrationSection } from "./RegistrationSection.tsx";
import { BasicInformation } from "./BasicInformation.tsx";
import type {
  RegistrationData,
  RegistrationDataError,
} from "../types/authentication.ts";
import { BLANK_STRING } from "../utils/global-constants.ts";
import { useState } from "react";
import * as React from "react";
import { validateEmail, validatePassword } from "../utils/validation-utils.ts";
import mandatoryFieldIcon from "../assets/mandatory-field.svg";
import { colorTransitionStyle } from "../utils/tailwind.ts";
import { Workload } from "./Workload.tsx";

export const RegistrationForm = () => {
  const [isBasicInformation, setIsBasicInformation] = useState<boolean>(true);
  const [isWorkload, setIsWorkload] = useState<boolean>(false);
  const [isNotes, setIsNotes] = useState<boolean>(false);

  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    firstName: BLANK_STRING,
    lastName: BLANK_STRING,
    email: BLANK_STRING,
    password: BLANK_STRING,
    confirmPassword: BLANK_STRING,
    personalEmail: BLANK_STRING,
  });

  const [registrationDataError, setRegistrationDataError] =
    useState<RegistrationDataError>({
      firstNameError: BLANK_STRING,
      lastNameError: BLANK_STRING,
      emailError: BLANK_STRING,
      passwordError: BLANK_STRING,
      confirmPasswordError: BLANK_STRING,
      personalEmailError: BLANK_STRING,
    });

  const validateRegistrationData = (e: React.FormEvent) => {
    e.preventDefault();
    const error = {
      firstNameError: BLANK_STRING,
      lastNameError: BLANK_STRING,
      emailError: BLANK_STRING,
      passwordError: BLANK_STRING,
      confirmPasswordError: BLANK_STRING,
      personalEmailError: BLANK_STRING,
    };
    if (registrationData.firstName === BLANK_STRING) {
      error.firstNameError = "The first name is required";
    }

    if (registrationData.lastName === BLANK_STRING) {
      error.lastNameError = "The last name is required";
    }

    error.emailError = validateEmail(registrationData.email, true);

    error.passwordError = validatePassword(
      registrationData.password,
      registrationData.confirmPassword,
    );

    error.personalEmailError = validateEmail(
      registrationData.personalEmail,
      false,
    );
    setRegistrationDataError(error);
    if (!isBasicInformationDataError(error)) {
      setIsBasicInformation(false);
      setIsWorkload(true);
    }
  };

  const isBasicInformationDataError = (error: RegistrationDataError) => {
    return (
      error.firstNameError !== BLANK_STRING ||
      error.lastNameError !== BLANK_STRING ||
      error.emailError !== BLANK_STRING ||
      error.passwordError !== BLANK_STRING ||
      error.confirmPasswordError !== BLANK_STRING ||
      error.personalEmailError !== BLANK_STRING
    );
  };

  return (
    <div className="flex w-screen h-screen">
      <div className="flex flex-col items-center gap-4 w-1/5 bg-[#f2f4fa] p-6">
        <RegistrationSection
          sectionTitle="Basic Information"
          activateSection={() => {
            setIsBasicInformation(true);
            setIsWorkload(false);
          }}
        />
        <RegistrationSection
          sectionTitle="Workload"
          activateSection={() => {
            setIsBasicInformation(false);
            setIsWorkload(true);
          }}
        />
        <RegistrationSection sectionTitle="Notes" />
      </div>
      <div className="flex-1 gap-y-5 bg-[#F7F7F7] py-4 pb-3 px-7 overflow-auto">
        {isBasicInformation && (
          <BasicInformation
            registrationData={registrationData}
            registrationDataError={registrationDataError}
            setRegistrationData={setRegistrationData}
          />
        )}
        {isWorkload && <Workload />}
        <div className="flex flex-row gap-x-1 mt-10">
          <img className="w-2" src={mandatoryFieldIcon} alt="Mandatory" />
          <p className="font-inter-300 text-[0.6rem]">
            The fields marked with asterisk are mandatory
          </p>
        </div>
        <div className="flex gap-x-2 mt-11">
          <button
            className={`border border-s border-[#60B5FF] rounded-3xl text-black bg-color-[#F7F7F7] text-[0.8rem] py-[0.2rem] px-[0.4rem] hover:border-solid-blue hover:text-white hover:bg-solid-blue font-roboto-500 ${colorTransitionStyle}`}
          >
            Cancel
          </button>
          <button
            className={`border-none rounded-3xl text-white bg-[#60B5FF] text-[0.8rem] py-[0.2rem] px-[0.4rem] hover:bg-solid-blue font-roboto-500 ${colorTransitionStyle}`}
            onClick={validateRegistrationData}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};
