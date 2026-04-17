import {
  createCreateCompanyRequestFromCompanyRegistrationData,
  getBlankCompanyRegistrationData,
} from "#/utils/company/company-registration-utils";
import * as React from "react";
import { useState } from "react";
import type {
  CompanyRegistrationError,
  CompanyRegistrationTypes,
  CreateCompanyRequest,
} from "#/types/internal/company/company-registration-types";
import { PageHeader } from "#/ui/PageHeader/PageHeader";
import { useNavigate } from "react-router-dom";
import { LANDING } from "#/constants/route/internal-route-constants";
import {
  getBlankCompanyRegistrationErrors,
  getCompanyRegistrationErrors,
} from "#/utils/company/company-registration-errors";
import { saveCompany } from "#/service/companyService";
import { useToast } from "#/ui/Toast/useToast";
import {
  handleErrors,
  isInstanceOfError,
} from "#/utils/api/api-common-error-utils";
import { COMPANY_REGISTRATION_HEADER } from "#/constants/common/header-constants";
import type { Error } from "#/types/api/common/api-errors-types";
import { validateCompanyRegistration } from "#/validator/company/company-validators";
import type { RegistrationContextData } from "#/types/internal/context/context-types";
import { CompanyRegistrationContext } from "#/context/CompanyRegistrationContext";
import { ToastRenderer } from "#/ui/Toast/ToastRenderer";
import { RegistrationButtons } from "#/components/Company/Registration/public/RegistrationButtons";
import { CompanyRegistrationForm } from "#/components/Company/Registration/public/CompanyRegistrationForm";

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
      () => false,
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
