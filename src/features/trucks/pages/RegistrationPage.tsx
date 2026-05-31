import {
  getBlankTruckRegistrationData,
  getBlankTruckRegistrationErrors,
} from "#/utils/truck/truck-utils";
import { useState } from "react";
import { TRUCK_CREATION_HEADER } from "#/constants/common/header-constants";
import { PageHeader } from "#/ui/PageHeader/PageHeader";
import { TruckRegistrationFormInputData } from "#/components/Truck/Registration/TruckRegistrationFormInputData";
import { SubmitButton } from "#/ui/Buttons/SubmitButton";
import { validateTruckRegistrationData } from "#/validator/truck/truck-validators";
import { saveTruck } from "#/features/trucks/api/trucks.api";
import { handleErrors } from "#/utils/api/api-common-error-utils";
import { CancelButton } from "#/ui/Buttons/CancelButton";
import { ToastRenderer } from "#/ui/Toast/ToastRenderer";
import { useToast } from "#/ui/Toast/useToast";
import { useNavigate, useParams } from "react-router-dom";
import type {
  TruckRegistrationData,
  TruckRegistrationError,
} from "#/types/internal/truck/truck-registration-types";
import { DASHBOARD, TRUCKS } from "#/shared/routes/routes";

export const RegistrationPage = () => {
  const [truckData, setTruckData] = useState<TruckRegistrationData>(
    getBlankTruckRegistrationData(),
  );
  const [truckErrorData, setTruckErrorData] = useState<TruckRegistrationError>(
    getBlankTruckRegistrationErrors(),
  );
  const toastData = useToast();
  const { companyUuid } = useParams();
  const baseRoute = `${DASHBOARD}/${companyUuid}${TRUCKS}`;
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

            const response = await saveTruck(truckData, companyUuid!!);
            const errors = handleErrors(
              response,
              getBlankTruckRegistrationErrors,
              () => false,
            );
            if (errors === null) {
              setTruckErrorData(getBlankTruckRegistrationErrors());
              setTruckData(getBlankTruckRegistrationData());
              toastData.withSuccessMessage(
                "The planner was successfully created.",
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
