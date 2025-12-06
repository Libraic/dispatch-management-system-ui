import {
  getBlankTruckRegistrationData,
  getBlankTruckRegistrationErrors,
  getCreateTruckRequest,
} from "../../../utils/truck/truck-utils.ts";
import { useState } from "react";
import { TRUCK_CREATION_HEADER } from "../../../constants/common/header-constants.ts";
import { PageHeader } from "../../Common/Page/PageHeader.tsx";
import { TruckRegistrationFormInputData } from "../../Truck/Registration/TruckRegistrationFormInputData.tsx";
import { SubmitButton } from "../../Common/Button/SubmitButton.tsx";
import { validateTruckRegistrationData } from "../../../validator/truck/truck-validators.ts";
import { saveTruck } from "../../../service/truckService.ts";
import { handleErrors } from "../../../utils/api/api-common-error-utils.ts";
import { CancelButton } from "../../Common/Button/CancelButton.tsx";
import { ToastRenderer } from "../../Common/Toast/ToastRenderer.tsx";
import { useToast } from "../../../hooks/useToast.ts";
import { useNavigate, useParams } from "react-router-dom";
import type {
  TruckRegistrationData,
  TruckRegistrationError,
} from "../../../types/internal/truck/truck-registration-types.ts";
import {
  DASHBOARD,
  TRUCKS_VIEW,
} from "../../../constants/route/internal-route-constants.ts";

export const TruckRegistrationPage = () => {
  const [truckData, setTruckData] = useState<TruckRegistrationData>(
    getBlankTruckRegistrationData(),
  );
  const [truckErrorData, setTruckErrorData] = useState<TruckRegistrationError>(
    getBlankTruckRegistrationErrors(),
  );
  const toastData = useToast();
  const { companyUuid } = useParams();
  const baseRoute = `${DASHBOARD}/${companyUuid}${TRUCKS_VIEW}`;
  const navigate = useNavigate();
  return (
    <>
      <PageHeader headerInfo={TRUCK_CREATION_HEADER} />
      <TruckRegistrationFormInputData
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
                "The trucks-board was successfully created.",
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
