import {
  createCreateCompanyRequestFromCompanyRegistrationData,
  getBlankCompanyRegistrationData,
} from "../../../utils/company/company-registration-utils.ts";
import * as React from "react";
import { useState } from "react";
import type {
  CompanyRegistrationError,
  CompanyRegistrationTypes,
  CreateCompanyRequest,
} from "../../../types/internal/company/company-registration-types.ts";
import { PageHeader } from "../../Common/Page/PageHeader.tsx";
import { useNavigate } from "react-router-dom";
import { LANDING } from "../../../constants/route/internal-route-constants.ts";
import {
  getBlankCompanyRegistrationErrors,
  getCompanyRegistrationErrors,
} from "../../../utils/company/company-registration-errors.ts";
import { saveCompany } from "../../../service/companyService.ts";
import { useToast } from "../../../hooks/useToast.ts";
import {
  handleErrors,
  isInstanceOfError,
} from "../../../utils/api/api-common-error-utils.ts";
import { COMPANY_REGISTRATION_HEADER } from "../../../constants/common/header-constants.ts";
import type { Error } from "../../../types/api/common/api-errors-types.ts";
import { validateCompanyRegistration } from "../../../validator/company/company-validators.ts";
import type { RegistrationContextData } from "../../../types/internal/context/context-types.ts";
import { CompanyRegistrationContext } from "../../../context/CompanyRegistrationContext.ts";
import { ToastRenderer } from "../../Common/Toast/ToastRenderer.tsx";
import { RegistrationButtons } from "../../Company/Registration/public/RegistrationButtons.tsx";
import { CompanyRegistrationForm } from "../../Company/Registration/public/CompanyRegistrationForm.tsx";

export const CompanyRegistrationPage = () => {
  const [companyRegistrationData, setCompanyRegistrationData] =
    useState<CompanyRegistrationTypes>(getBlankCompanyRegistrationData());
  const [companyRegistrationErrors, setCompanyRegistrationErrors] =
    useState<CompanyRegistrationError>(getBlankCompanyRegistrationErrors());
  const navigate = useNavigate();
  const toast = useToast();
  const registrationContextData: RegistrationContextData<
    CompanyRegistrationTypes,
    CompanyRegistrationError
  > = {
    registrationData: companyRegistrationData,
    setRegistrationData: setCompanyRegistrationData,
    registrationDataError: companyRegistrationErrors,
  };

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
    } else if (isInstanceOfError(apiErrors)) {
      const e = apiErrors as Error;
      toast.withErrorMessage(e.message);
    } else {
      setCompanyRegistrationErrors(apiErrors as CompanyRegistrationError);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="h-1/4">
        <PageHeader headerInfo={COMPANY_REGISTRATION_HEADER} />
      </div>
      <div className="flex flex-col gap-y-[5rem]">
        <CompanyRegistrationContext value={registrationContextData}>
          <CompanyRegistrationForm />
        </CompanyRegistrationContext>
        <RegistrationButtons
          cancelFn={() => navigate(LANDING)}
          submitFn={createCompany}
        />
      </div>
      <ToastRenderer toast={toast} />
    </div>
  );
};
