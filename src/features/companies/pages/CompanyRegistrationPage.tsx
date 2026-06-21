import { getBlankCompanyRegistrationData } from "#/utils/company/company-registration-utils";
import * as React from "react";
import { useContext, useState } from "react";
import type {
  CompanyRegistrationData,
  CompanyRegistrationError,
} from "#/types/internal/company/company-registration-data";
import { PageHeader } from "#/ui/PageHeader/PageHeader";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DASHBOARD, LANDING } from "#/shared/routes/routes";
import { getCompanyRegistrationErrors } from "#/utils/company/company-registration-errors";
import { useToast } from "#/ui/Toast/useToast";
import { COMPANY_REGISTRATION_HEADER } from "#/constants/common/header-constants";
import { CompanyRegistrationContext } from "#/context/CompanyRegistrationContext";
import { ToastRenderer } from "#/ui/Toast/ToastRenderer";
import { RegistrationButtons } from "#/components/Company/Registration/public/RegistrationButtons";
import { CompanyRegistrationForm } from "#/components/Company/Registration/public/CompanyRegistrationForm";
import type { RegistrationContextData } from "#/features/drivers/context/context.types";
import { saveCompany } from "#/features/companies/api/companies.api";
import { ToastContext } from "#/ui/Toast/context/ToastContext";
import type { ApiError } from "#/shared/types/api.types";
import { handleApiError } from "#/shared/api/utils/api.utils";
import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "#/features/authentication/api/api.types";

export const CompanyRegistrationPage = () => {
  const [companyRegistrationData, setCompanyRegistrationData] =
    useState<CompanyRegistrationData>(getBlankCompanyRegistrationData());
  const [companyRegistrationErrors, setCompanyRegistrationErrors] =
    useState<CompanyRegistrationError>({});
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
  const [searchParams] = useSearchParams();
  const invitationToken = searchParams.get("token");
  const { showToast } = useContext(ToastContext);

  const createCompany = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!invitationToken) {
      toast.withErrorMessage("Invalid invitation link.");
      return;
    }

    const errors = getCompanyRegistrationErrors(companyRegistrationData);
    setCompanyRegistrationErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    const response = await saveCompany(
      companyRegistrationData,
      invitationToken,
    );

    if (response.ok) {
      const token = response.data.token;
      const error = {
        message: "Something went wrong.",
        type: "GENERAL",
      } as ApiError;
      if (!token) {
        showToast(error);
        return;
      }

      const jwtPayload = jwtDecode<JwtPayload>(token);
      const authorityId = jwtPayload?.authorityId;
      if (!authorityId) {
        showToast(error);
        return;
      }

      localStorage.setItem("token", token);
      navigate(`/${encodeURIComponent(authorityId)}${DASHBOARD}`);
      return;
    }

    const error = response.error as ApiError;
    handleApiError({
      error: error,
      setFieldErrors: setCompanyRegistrationErrors,
      showToast,
    });
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
