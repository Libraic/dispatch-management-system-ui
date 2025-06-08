import { RegistrationSection } from "./RegistrationSection.tsx";
import { BasicInformation } from "./BasicInformation.tsx";
import {
  type RegistrationData,
  type RegistrationDataError,
  SectionEnum,
} from "../types/authentication.ts";
import { BLANK_STRING, DEFAULT_BIRTH_DATE } from "../utils/global-constants.ts";
import * as React from "react";
import { useState } from "react";
import { validateEmail, validatePassword } from "../utils/validation-utils.ts";
import mandatoryFieldIcon from "../assets/mandatory-field.svg";
import { colorTransitionStyle } from "../utils/tailwind.ts";
import { Workload } from "./Workload.tsx";
import { EmploymentInformation } from "./EmploymentInformation.tsx";

export const RegistrationForm = () => {
  const [activeSection, setActiveSection] = useState<SectionEnum>(
    SectionEnum.BASIC_INFORMATION,
  );

  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    firstName: BLANK_STRING,
    lastName: BLANK_STRING,
    email: BLANK_STRING,
    password: BLANK_STRING,
    confirmPassword: BLANK_STRING,
    personalEmail: BLANK_STRING,
    birthDate: DEFAULT_BIRTH_DATE,
    employmentDate: {
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    },
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
  };

  return (
    <div className="flex w-screen h-screen">
      <div className="flex flex-col items-center gap-7 w-1/10 bg-[#f2f4fa] p-6">
        <RegistrationSection
          sectionTitle="Basic Information"
          activateSection={() => {
            setActiveSection(SectionEnum.BASIC_INFORMATION);
          }}
        />
        <RegistrationSection
          sectionTitle="Employment Information"
          activateSection={() => {
            setActiveSection(SectionEnum.EMPLOYMENT_INFORMATION);
          }}
        />
        <RegistrationSection
          sectionTitle="Workload"
          activateSection={() => {
            setActiveSection(SectionEnum.WORKLOAD);
          }}
        />
        <RegistrationSection
          sectionTitle="Notes"
          activateSection={() => {
            setActiveSection(SectionEnum.NOTES);
          }}
        />
      </div>
      <div className="flex-1 gap-y-5 bg-[#F7F7F7] py-4 pb-3 px-7 overflow-auto">
        {activeSection === SectionEnum.BASIC_INFORMATION && (
          <BasicInformation
            registrationData={registrationData}
            registrationDataError={registrationDataError}
            setRegistrationData={setRegistrationData}
          />
        )}
        {activeSection === SectionEnum.EMPLOYMENT_INFORMATION && (
          <EmploymentInformation
            registrationData={registrationData}
            setRegistrationData={setRegistrationData}
          />
        )}
        {activeSection === SectionEnum.WORKLOAD && <Workload />}
        <div className="flex flex-row gap-x-1 mt-10">
          <img className="w-2" src={mandatoryFieldIcon} alt="Mandatory" />
          <p className="font-inter-300 text-[0.8rem]">
            The fields marked with asterisk are mandatory
          </p>
        </div>
        <div className="flex gap-x-2 mt-11">
          <button
            className={`border border-s border-[#60B5FF] rounded-3xl text-black bg-color-[#F7F7F7] text-[1rem] py-[0.2rem] px-[0.4rem] hover:border-solid-blue hover:text-white hover:bg-solid-blue font-roboto-500 ${colorTransitionStyle}`}
          >
            Cancel
          </button>
          <button
            className={`border-none rounded-3xl text-white bg-[#60B5FF] text-[1rem] py-[0.2rem] px-[0.4rem] hover:bg-solid-blue font-roboto-500 ${colorTransitionStyle}`}
            onClick={validateRegistrationData}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};
