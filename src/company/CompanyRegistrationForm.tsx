import { InputForm } from "../global/InputForm.tsx";
import {
  alterCompanySimpleField,
  createCreateCompanyRequestFromCompanyRegistrationData,
  getBlankCompanyRegistrationData,
} from "../utils/registration/company/company-registration-utils.ts";
import * as React from "react";
import { useState } from "react";
import type {
  CompanyRegistrationData,
  CompanyRegistrationError,
  CreateCompanyRequest,
} from "../types/registration/company/company-registration-data.ts";
import { BLANK_STRING } from "../utils/constants/global.ts";
import { useDateObject } from "../hooks/useDateObject.ts";
import { getCurrentYearData } from "../utils/date.ts";
import { DateForm } from "../global/DateForm.tsx";
import { Information } from "../global/Information.tsx";
import { RegistrationSectionHeader } from "../registration/RegistrationSectionHeader.tsx";
import { CancelButton } from "../button/CancelButton.tsx";
import { SubmitButton } from "../button/SubmitButton.tsx";
import { useNavigate } from "react-router-dom";
import { HOME } from "../utils/routes/routes.ts";
import {
  areErrors,
  getBlankCompanyRegistrationErrors,
  getCompanyRegistrationErrors,
} from "../utils/registration/company/company-registration-errors.ts";
import { usePrepopulateDate } from "../hooks/usePrepopulateDate.ts";
import { saveCompany } from "../service/company-service.ts";

export const CompanyRegistrationForm = () => {
  const [companyRegistrationData, setCompanyRegistrationData] =
    useState<CompanyRegistrationData>(getBlankCompanyRegistrationData());
  const [companyRegistrationErrors, setCompanyRegistrationErrors] =
    useState<CompanyRegistrationError>(getBlankCompanyRegistrationErrors());
  const currentYearData = getCurrentYearData();
  const navigate = useNavigate();
  const dateObject = useDateObject(
    currentYearData.day,
    currentYearData.month,
    currentYearData.year,
  );
  usePrepopulateDate(setCompanyRegistrationData, dateObject, "serviceDate");

  const createCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = getCompanyRegistrationErrors(companyRegistrationData);
    setCompanyRegistrationErrors(errors);
    if (areErrors(errors)) {
      return;
    }

    const createCompanyRequest: CreateCompanyRequest =
      createCreateCompanyRequestFromCompanyRegistrationData(
        companyRegistrationData,
      );
    const companyData = await saveCompany(createCompanyRequest);
    if (companyData !== undefined && companyData.error === null) {
      navigate(HOME);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="h-1/4">
        <RegistrationSectionHeader
          header="Company"
          subheader="Add a new Company to the system"
        />
      </div>

      <div className="flex flex-col justify-between h-3/4 m-">
        <div className="flex flex-col gap-y-5 justify-center items-center">
          <div className="flex flex-row gap-5.5 mb-10">
            <InputForm
              label="Name"
              placeholder="Alpha Expedition"
              type="text"
              name="name"
              inputFieldValue={companyRegistrationData.name}
              isMandatory={true}
              errorMessage={companyRegistrationErrors.name}
              saveInputData={(companyName: string) =>
                alterCompanySimpleField(
                  setCompanyRegistrationData,
                  "name",
                  companyName,
                )
              }
            />
            <InputForm
              label="MC Number"
              placeholder="MC#02854"
              type="text"
              name="mc-number"
              inputFieldValue={
                companyRegistrationData?.mcNumber ?? BLANK_STRING
              }
              isMandatory={false}
              saveInputData={(mcNumber: string) =>
                alterCompanySimpleField(
                  setCompanyRegistrationData,
                  "mcNumber",
                  mcNumber,
                )
              }
            />
            <InputForm
              label="Address"
              placeholder="601 Shiloh Rd"
              type="text"
              name="address"
              inputFieldValue={companyRegistrationData?.address ?? BLANK_STRING}
              isMandatory={false}
              saveInputData={(address: string) =>
                alterCompanySimpleField(
                  setCompanyRegistrationData,
                  "address",
                  address,
                )
              }
            />
          </div>

          <div className="flex gap-x-10 mb-5">
            <DateForm
              dateObject={dateObject}
              endingYear={new Date().getFullYear()}
            />
          </div>
          <Information />
        </div>

        <div className="flex justify-center items-center gap-x-3 mx-5 my-5">
          <CancelButton actionText="Cancel" action={() => navigate(HOME)} />
          <SubmitButton actionText="Submit" action={createCompany} />
        </div>
      </div>
    </div>
  );
};
