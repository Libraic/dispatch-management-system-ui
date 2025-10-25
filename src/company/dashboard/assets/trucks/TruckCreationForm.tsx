import {
  getBlankTruckRegistrationData,
  getBlankTruckRegistrationErrors,
  getCreateTruckRequest,
} from "../../../../utils/assets/truck-utils.ts";
import { useState } from "react";
import { TRUCK_CREATION_HEADER } from "../../../../utils/constants/headers.ts";
import { PageHeader } from "../../../../global/PageHeader.tsx";
import { TruckCreationFormInputData } from "./TruckCreationFormInputData.tsx";
import { SubmitButton } from "../../../../button/SubmitButton.tsx";
import { validateTruckRegistrationData } from "../../../../utils/assets/truck-error-utils.ts";
import { saveTruck } from "../../../../service/truck-service.ts";
import { handleErrors } from "../../../../utils/api/common-api-error-utils.ts";
import { CancelButton } from "../../../../button/CancelButton.tsx";
import { ToastRenderer } from "../../../../toast/ToastRenderer.tsx";
import { useToast } from "../../../../hooks/useToast.ts";
import { useNavigate, useParams } from "react-router-dom";
import type {
  TruckRegistrationData,
  TruckRegistrationError,
} from "../../../../types/assets/truck-data.ts";

export const TruckCreationForm = () => {
  const [truckData, setTruckData] = useState<TruckRegistrationData>(
    getBlankTruckRegistrationData(),
  );
  const [truckErrorData, setTruckErrorData] = useState<TruckRegistrationError>(
    getBlankTruckRegistrationErrors(),
  );
  const toastData = useToast();
  const { companyUuid } = useParams();
  const baseRoute = `/dashboard/${companyUuid}`;
  const navigate = useNavigate();
  return (
    <>
      <PageHeader headerInfo={TRUCK_CREATION_HEADER} />
      <TruckCreationFormInputData
        truckData={truckData}
        setTruckData={setTruckData}
        truckErrorData={truckErrorData}
      />
      <div className="flex items-center justify-center gap-x-10 mt-[6rem]">
        <SubmitButton
          actionText="Submit"
          action={async () => {
            const errorsPriorApiCall = validateTruckRegistrationData(truckData);
            if (errorsPriorApiCall !== null) {
              setTruckErrorData(errorsPriorApiCall);
              return;
            }

            const createTruckRequest = getCreateTruckRequest(
              truckData,
              companyUuid!!,
            );
            const response = await saveTruck(createTruckRequest);
            const errors = handleErrors(
              response,
              getBlankTruckRegistrationErrors,
              (_) => false,
            );
            if (errors === null) {
              setTruckErrorData(getBlankTruckRegistrationErrors());
              setTruckData(getBlankTruckRegistrationData());
              toastData.withSuccessMessage(
                "The truck was successfully created.",
              );
            } else if ("message" in errors) {
              setTruckErrorData(getBlankTruckRegistrationErrors());
              toastData.withErrorMessage(errors.message);
            } else if (!Array.isArray(errors)) {
              setTruckErrorData(errors as TruckRegistrationError);
            }
          }}
        />
        <CancelButton actionText="Quit" action={() => navigate(baseRoute)} />
      </div>
      <ToastRenderer toast={toastData} />
    </>
  );
};
