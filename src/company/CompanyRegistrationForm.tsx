import {
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
import { saveCompany } from "../service/company-service.ts";
import { useToast } from "../hooks/useToast.ts";
import { Toast } from "../toast/Toast.tsx";
import { INTERNAL_SERVER_ERROR } from "../utils/error-messages.ts";
import { StartAndServiceDate } from "./StartAndServiceDate.tsx";
import { CompanyBasicData } from "./CompanyBasicData.tsx";

export const CompanyRegistrationForm = () => {
  const [companyRegistrationData, setCompanyRegistrationData] =
    useState<CompanyRegistrationData>(getBlankCompanyRegistrationData());
  const [companyRegistrationErrors, setCompanyRegistrationErrors] =
    useState<CompanyRegistrationError>(getBlankCompanyRegistrationErrors());
  const navigate = useNavigate();
  const toastData = useToast();

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
    if (!companyData) {
      toastData.withErrorMessage(INTERNAL_SERVER_ERROR);
    } else if (companyData.error === null) {
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
          <CompanyBasicData
            companyRegistrationData={companyRegistrationData}
            companyRegistrationErrors={companyRegistrationErrors}
            setCompanyRegistrationData={setCompanyRegistrationData}
          />
          <StartAndServiceDate
            setCompanyRegistrationData={setCompanyRegistrationData}
          />
          <Information />
        </div>
        <div className="flex justify-center items-center gap-x-3 mx-5 my-5">
          <CancelButton actionText="Cancel" action={() => navigate(HOME)} />
          <SubmitButton actionText="Submit" action={createCompany} />
        </div>
      </div>
      {toastData.getMessage() !== BLANK_STRING && (
        <Toast
          key={toastData.getIdentifier()}
          message={toastData.getMessage()}
          type={toastData.getOperationResult()}
        />
      )}
    </div>
  );
};
