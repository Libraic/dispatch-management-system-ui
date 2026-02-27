import { useState } from "react";
import {
  type TrailerRegistrationData,
  type TrailerRegistrationError,
} from "../../../types/internal/trailer/trailer-registration-types.ts";
import {
  getBlankTrailerRegistrationData,
  getBlankTrailerRegistrationErrors,
  getCreateTrailerRequest,
} from "../../../utils/trailer/trailer-utils.ts";
import { TrailerRegistrationFormInputData } from "../../Trailer/Registration/TrailerRegistrationFormInputData.tsx";
import { TRAILER_CREATION_HEADER } from "../../../constants/common/header-constants.ts";
import { PageHeader } from "../../Common/Page/PageHeader.tsx";
import { SubmitButton } from "../../Common/Button/SubmitButton.tsx";
import { handleErrors } from "../../../utils/api/api-common-error-utils.ts";
import { validateTrailerRegistrationData } from "../../../validator/trailer/trailer-validators.ts";
import { saveTrailer } from "../../../service/trailerService.ts";
import { CancelButton } from "../../Common/Button/CancelButton.tsx";
import { ToastRenderer } from "../../Common/Toast/ToastRenderer.tsx";
import { useToast } from "../../../hooks/useToast.ts";
import { useNavigate, useParams } from "react-router-dom";
import { TRAILERS_VIEW } from "../../../constants/route/internal-route-constants.ts";

export const TrailerRegistrationPage = () => {
  const [trailerErrorData, setTrailerErrorData] =
    useState<TrailerRegistrationError>(getBlankTrailerRegistrationErrors());
  const [trailerData, setTrailerData] = useState<TrailerRegistrationData>(
    getBlankTrailerRegistrationData(),
  );
  const toastData = useToast();
  const { companyUuid } = useParams();
  const baseRoute = `/dashboard/${companyUuid}${TRAILERS_VIEW}`;
  const navigate = useNavigate();

  return (
    <>
      <PageHeader headerInfo={TRAILER_CREATION_HEADER} />
      <TrailerRegistrationFormInputData
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
              () => false,
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
