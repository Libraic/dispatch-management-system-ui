import { TextualInputForm } from "../../Common/InputForm/public/TextualInputForm.tsx";
import {
  setObjectStringField,
  validateMandatoryField,
  validatePhoneNumber,
} from "../../../utils/registration/registration-utils.ts";
import * as React from "react";
import { useState } from "react";
import { BLANK_STRING } from "../../../constants/common/global-constants.ts";
import { useNavigate, useParams } from "react-router-dom";
import type { DispatcherRegistrationErrorData } from "../../../types/internal/dispatcher/dispatcher-registration-types.ts";
import { SubmitButton } from "../../Common/Button/SubmitButton.tsx";
import { CancelButton } from "../../Common/Button/CancelButton.tsx";
import { DISPATCHER_REGISTRATION_HEADER } from "../../../constants/common/header-constants.ts";
import { PageHeader } from "../../Common/Page/PageHeader.tsx";
import { saveDispatcher } from "../../../service/dispatcherService.ts";
import type { CreateDispatcherRequest } from "../../../types/api/dispatcher/dispatcher-api-request-types.ts";
import type { ApiResponse } from "../../../types/api/common/api-response-types.ts";
import type {
  Error,
  GroupsErrorResponse,
} from "../../../types/api/common/api-errors-types.ts";
import { handleErrors } from "../../../utils/api/api-common-error-utils.ts";
import { useToast } from "../../../hooks/useToast.ts";
import { Toast } from "../../Common/Toast/Toast.tsx";
import {
  getBlankDispatcherRegistrationData,
  getBlankDispatcherRegistrationErrorData,
} from "../../../utils/dispatcher/dispatcher-registration-utils.ts";
import {
  NAME_PLACEHOLDER,
  PHONE_NUMBER_PLACEHOLDER,
} from "../../../constants/common/placeholder-constants.ts";
import {
  cleanPhoneNumber,
  formatPhoneNumber,
} from "../../../utils/global/input-form-utils.ts";

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
    <div className="flex flex-col h-screen w-screen gap-y-[15rem]">
      <PageHeader headerInfo={DISPATCHER_REGISTRATION_HEADER} />
      <div className="flex items-center justify-center gap-x-[5rem]">
        <TextualInputForm
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
        <TextualInputForm
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
  );
};
