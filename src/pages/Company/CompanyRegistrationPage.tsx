import { getBlankCompanyRegistrationData } from "#/utils/company/company-registration-utils";
import * as React from "react";
import { useState } from "react";
import type {
  CompanyRegistrationError,
  CompanyRegistrationData,
} from "#/types/internal/company/company-registration-data";
import { PageHeader } from "#/ui/PageHeader/PageHeader";
import { useNavigate } from "react-router-dom";
import { COMPANIES_LIST, LANDING } from "#/shared/routes/routes";
import {
  getBlankCompanyRegistrationErrors,
  getCompanyRegistrationErrors,
} from "#/utils/company/company-registration-errors";
import { useToast } from "#/ui/Toast/useToast";
import {
  handleErrors,
  isInstanceOfError,
} from "#/utils/api/api-common-error-utils";
import { COMPANY_REGISTRATION_HEADER } from "#/constants/common/header-constants";
import type { Error } from "#/types/api/common/api-errors-types";
import { validateCompanyRegistration } from "#/validator/company/company-validators";
import { CompanyRegistrationContext } from "#/context/CompanyRegistrationContext";
import { ToastRenderer } from "#/ui/Toast/ToastRenderer";
import { RegistrationButtons } from "#/components/Company/Registration/public/RegistrationButtons";
import { CompanyRegistrationForm } from "#/components/Company/Registration/public/CompanyRegistrationForm";
import type { RegistrationContextData } from "#/features/drivers/context/context.types";
import { saveCompany } from "#/features/companies/api/companies.api";

export const CompanyRegistrationPage = () => {
  const [companyRegistrationData, setCompanyRegistrationData] =
    useState<CompanyRegistrationData>(getBlankCompanyRegistrationData());
  const [companyRegistrationErrors, setCompanyRegistrationErrors] =
    useState<CompanyRegistrationError>(getBlankCompanyRegistrationErrors());
  const navigate = useNavigate();
  const toast = useToast();
  const registrationContextData: RegistrationContextData<
    CompanyRegistrationData,
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

    const companyData = await saveCompany(companyRegistrationData);
    const apiErrors = handleErrors(
      companyData,
      getBlankCompanyRegistrationErrors,
      () => false,
    );
    if (apiErrors == null) {
      navigate(COMPANIES_LIST);
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
