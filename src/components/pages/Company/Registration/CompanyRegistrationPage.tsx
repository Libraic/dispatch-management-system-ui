import {
  createCreateCompanyRequestFromCompanyRegistrationData,
  getBlankCompanyRegistrationData,
} from "../../../../utils/company/company-registration-utils.ts";
import * as React from "react";
import { useState } from "react";
import type {
  CompanyRegistrationData,
  CompanyRegistrationError,
  CreateCompanyRequest,
} from "../../../../types/internal/company/company-registration-data.ts";
import { BLANK_STRING } from "../../../../constants/common/global-constants.ts";
import { MandatoryFieldDisclaimer } from "../../../atoms/Typography/MandatoryFieldDisclaimer.tsx";
import { PageHeader } from "../../../organisms/Header/PageHeader.tsx";
import { CancelButton } from "../../../atoms/Button/CancelButton.tsx";
import { SubmitButton } from "../../../atoms/Button/SubmitButton.tsx";
import { useNavigate } from "react-router-dom";
import { LANDING } from "../../../../constants/route/internal-route-constants.ts";
import {
  getBlankCompanyRegistrationErrors,
  getCompanyRegistrationErrors,
} from "../../../../utils/company/company-registration-errors.ts";
import { saveCompany } from "../../../../service/companyService.ts";
import { useToast } from "../../../../hooks/useToast.ts";
import { Toast } from "../../../organisms/Toast/Toast.tsx";
import { CompanyStartAndServiceDates } from "../../../organisms/Company/Registration/CompanyStartAndServiceDates.tsx";
import { CompanyBasicData } from "../../../molecules/Company/Registration/CompanyBasicData.tsx";
import { handleErrors } from "../../../../utils/api/api-common-error-utils.ts";
import { COMPANY_REGISTRATION_HEADER } from "../../../../constants/common/header-constants.ts";
import type { Error } from "../../../../types/api/common/api-errors-types.ts";
import { validateCompanyRegistration } from "../../../../validator/company/company-validators.ts";

export const CompanyRegistrationPage = () => {
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
    if (validateCompanyRegistration(errors)) {
      return;
    }

    const createCompanyRequest: CreateCompanyRequest =
      createCreateCompanyRequestFromCompanyRegistrationData(
        companyRegistrationData,
      );
    const companyData = await saveCompany(createCompanyRequest);
    const apiErrors = handleErrors(
      companyData,
      getBlankCompanyRegistrationErrors,
      (_) => false,
    );

    if (apiErrors == null) {
      navigate(LANDING);
    } else if (!Array.isArray(apiErrors)) {
      const e = apiErrors as Error;
      toastData.withErrorMessage(e.message);
    } else {
      setCompanyRegistrationErrors(apiErrors as CompanyRegistrationError);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="h-1/4">
        <PageHeader headerInfo={COMPANY_REGISTRATION_HEADER} />
      </div>
      <div className="flex flex-col justify-between h-3/4 m-">
        <div className="flex flex-col gap-y-5 justify-center items-center">
          <CompanyBasicData
            companyRegistrationData={companyRegistrationData}
            companyRegistrationErrors={companyRegistrationErrors}
            setCompanyRegistrationData={setCompanyRegistrationData}
          />
          <CompanyStartAndServiceDates
            setCompanyRegistrationData={setCompanyRegistrationData}
          />
          <MandatoryFieldDisclaimer />
        </div>
        <div className="flex justify-center items-center gap-x-3 mx-5 my-5">
          <CancelButton actionText="Cancel" action={() => navigate(LANDING)} />
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
