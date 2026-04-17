import { TextualInputField } from "#/ui/InputField/components/public/TextualInputField";
import {
  setObjectStringField,
  validateMandatoryField,
  validatePhoneNumber,
} from "#/utils/registration/registration-utils";
import * as React from "react";
import { useState } from "react";
import { BLANK_STRING } from "#/constants/common/global-constants";
import { useNavigate, useParams } from "react-router-dom";
import type { DispatcherRegistrationErrorData } from "#/types/internal/dispatcher/dispatcher-registration-types";
import { SubmitButton } from "#/ui/Buttons/SubmitButton";
import { CancelButton } from "#/ui/Buttons/CancelButton";
import { DISPATCHER_REGISTRATION_HEADER } from "#/constants/common/header-constants";
import { PageHeader } from "#/ui/PageHeader/PageHeader";
import { saveDispatcher } from "#/service/dispatcherService";
import type { CreateDispatcherRequest } from "#/types/api/dispatcher/dispatcher-api-request-types";
import type {
  Error,
  GroupsErrorResponse,
} from "#/types/api/common/api-errors-types";
import { handleErrors } from "#/utils/api/api-common-error-utils";
import { useToast } from "#/ui/Toast/useToast";
import { Toast } from "#/ui/Toast/ToastComponent/Toast";
import {
  getBlankDispatcherRegistrationData,
  getBlankDispatcherRegistrationErrorData,
} from "#/utils/dispatcher/dispatcher-registration-utils";
import {
  NAME_PLACEHOLDER,
  PHONE_NUMBER_PLACEHOLDER,
} from "#/constants/common/placeholder-constants";
import { SidebarWrapper } from "#/components/SidebarWrapper";
import {
  cleanPhoneNumber,
  formatPhoneNumber,
} from "#/shared/utils/inputField.formatter";
import type { ApiResponse } from "#/shared/types/api.types";

export const DispatcherRegistrationPage = () => {
  const [dispatcherRegistrationData, setDispatcherRegistrationData] = useState(
    getBlankDispatcherRegistrationData(),
  );

  const [dispatcherRegistrationErrorData, setDispatcherRegistrationErrorData] =
    useState(getBlankDispatcherRegistrationErrorData());

  const companyUuid = useParams().companyUuid!!;
  const navigate = useNavigate();
  const baseRoute = `/dashboard/${companyUuid}`;
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: DispatcherRegistrationErrorData =
      getBlankDispatcherRegistrationErrorData();
    errors.name = validateMandatoryField(
      dispatcherRegistrationData.name,
      "name",
    );

    const cleanedPhoneNumber = cleanPhoneNumber(
      dispatcherRegistrationData.phoneNumber,
    );
    errors.phoneNumber = validatePhoneNumber(
      cleanedPhoneNumber,
      "mandatory",
      "phone number",
    );

    if (errors.name === BLANK_STRING && errors.phoneNumber === BLANK_STRING) {
      const request: CreateDispatcherRequest = {
        name: dispatcherRegistrationData.name,
        phoneNumber: cleanedPhoneNumber,
        companyUuid: companyUuid,
      };
      const response = await saveDispatcher(request);
      processErrors(response);
    } else {
      setDispatcherRegistrationErrorData(errors);
    }
  };

  const processErrors = (
    response: ApiResponse<null, Error | GroupsErrorResponse>,
  ) => {
    const errors = handleErrors(
      response,
      getBlankDispatcherRegistrationErrorData,
      () => false,
    );
    if (errors === null) {
      navigate(baseRoute);
    } else if ("message" in errors) {
      toast.withErrorMessage(errors.message);
    } else if (!Array.isArray(errors)) {
      setDispatcherRegistrationErrorData(
        errors as DispatcherRegistrationErrorData,
      );
    }
  };

  return (
    <SidebarWrapper>
      <div className="flex flex-col h-screen w-screen gap-y-[15rem]">
        <PageHeader headerInfo={DISPATCHER_REGISTRATION_HEADER} />
        <div className="flex items-center justify-center gap-x-[5rem]">
          <TextualInputField
            label="Name"
            placeholder={NAME_PLACEHOLDER}
            inputFieldValue={dispatcherRegistrationData.name}
            isMandatory={true}
            errorMessage={dispatcherRegistrationErrorData.name}
            saveInputData={(firstName: string) =>
              setObjectStringField(
                setDispatcherRegistrationData,
                "name",
                firstName,
              )
            }
          />
          <TextualInputField
            label="Phone Number"
            placeholder={PHONE_NUMBER_PLACEHOLDER}
            inputFieldValue={dispatcherRegistrationData.phoneNumber}
            isMandatory={true}
            errorMessage={dispatcherRegistrationErrorData.phoneNumber}
            saveInputData={(phoneNumber: string) =>
              setObjectStringField(
                setDispatcherRegistrationData,
                "phoneNumber",
                formatPhoneNumber(phoneNumber),
              )
            }
          />
        </div>
        <div className="flex flex-row items-center justify-center w-screen mb-15 gap-x-10">
          <SubmitButton actionText="Submit" action={handleSubmit} />
          <CancelButton actionText="Quit" action={() => navigate(baseRoute)} />
        </div>
        {toast.getMessage() !== BLANK_STRING && (
          <Toast
            key={toast.getIdentifier()}
            message={toast.getMessage()}
            type={toast.getOperationResult()}
          />
        )}
      </div>
    </SidebarWrapper>
  );
};
