import { useState } from "react";
import {
  type TrailerRegistrationData,
  type TrailerRegistrationError,
} from "../../../../types/assets/trailer-data.ts";
import {
  getBlankTrailerRegistrationData,
  getBlankTrailerRegistrationErrors,
  getCreateTrailerRequest,
} from "../../../../utils/assets/trailer-utils.ts";
import { TrailerCreationFormInputData } from "./TrailerCreationFormInputData.tsx";
import { TRAILER_CREATION_HEADER } from "../../../../utils/constants/headers.ts";
import { PageHeader } from "../../../../global/PageHeader.tsx";
import { SubmitButton } from "../../../../button/SubmitButton.tsx";
import { handleErrors } from "../../../../utils/api/common-api-error-utils.ts";
import { validateTrailerRegistrationData } from "../../../../utils/assets/trailer-error-utils.ts";
import { saveTrailer } from "../../../../service/trailer-service.ts";
import { CancelButton } from "../../../../button/CancelButton.tsx";
import { ToastRenderer } from "../../../../toast/ToastRenderer.tsx";
import { useToast } from "../../../../hooks/useToast.ts";
import { useNavigate, useParams } from "react-router-dom";

export const TrailerCreationForm = () => {
  const [trailerErrorData, setTrailerErrorData] =
    useState<TrailerRegistrationError>(getBlankTrailerRegistrationErrors());
  const [trailerData, setTrailerData] = useState<TrailerRegistrationData>(
    getBlankTrailerRegistrationData(),
  );
  const toastData = useToast();
  const { companyUuid } = useParams();
  const baseRoute = `/dashboard/${companyUuid}`;
  const navigate = useNavigate();

  return (
    <>
      <PageHeader headerInfo={TRAILER_CREATION_HEADER} />
      <TrailerCreationFormInputData
        setTrailerData={setTrailerData}
        trailerErrorData={trailerErrorData}
        trailerData={trailerData}
      />
      <div className="flex flex-row items-center justify-center w-screen my-25 gap-x-10">
        <SubmitButton
          actionText="Submit"
          action={async () => {
            const errorsPriorApiCall =
              validateTrailerRegistrationData(trailerData);
            if (errorsPriorApiCall !== null) {
              setTrailerErrorData(errorsPriorApiCall);
              return;
            }

            const createTrailerRequest = getCreateTrailerRequest(
              trailerData,
              companyUuid!!,
            );
            const response = await saveTrailer(createTrailerRequest);
            const errors = handleErrors(
              response,
              getBlankTrailerRegistrationErrors,
              (_) => false,
            );
            if (errors === null) {
              setTrailerErrorData(getBlankTrailerRegistrationErrors());
              setTrailerData(getBlankTrailerRegistrationData());
              toastData.withSuccessMessage(
                "The trailer was successfully created.",
              );
            } else if ("message" in errors) {
              setTrailerData(getBlankTrailerRegistrationData());
              toastData.withErrorMessage(errors.message);
            } else if (!Array.isArray(errors)) {
              setTrailerErrorData(errors as TrailerRegistrationError);
            }
          }}
        />
        <CancelButton actionText="Quit" action={() => navigate(baseRoute)} />
      </div>
      <ToastRenderer toast={toastData} />
    </>
  );
};
