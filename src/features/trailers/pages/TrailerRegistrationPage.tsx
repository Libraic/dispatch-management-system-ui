import { useState } from "react";
import {
  type TrailerRegistrationData,
  type TrailerRegistrationError,
} from "#/types/internal/trailer/trailer-registration-types";
import { getBlankTrailerRegistrationErrors } from "#/utils/trailer/trailer-utils";
import { TrailerRegistrationFormInputData } from "#/components/Trailer/Registration/TrailerRegistrationFormInputData";
import { TRAILER_CREATION_HEADER } from "#/constants/common/header-constants";
import { PageHeader } from "#/ui/PageHeader/PageHeader";
import { SubmitButton } from "#/ui/Buttons/SubmitButton";
import { handleErrors } from "#/utils/api/api-common-error-utils";
import { validateTrailerRegistrationData } from "#/validator/trailer/trailer-validators";
import { saveTrailer } from "#/features/trailers/api/trailers.api";
import { CancelButton } from "#/ui/Buttons/CancelButton";
import { ToastRenderer } from "#/ui/Toast/ToastRenderer";
import { useToast } from "#/ui/Toast/useToast";
import { useNavigate, useParams } from "react-router-dom";
import { TRAILERS } from "#/shared/routes/routes";

export const TrailerRegistrationPage = () => {
  const [trailerErrorData, setTrailerErrorData] =
    useState<TrailerRegistrationError>(getBlankTrailerRegistrationErrors());
  const [trailerData, setTrailerData] = useState<TrailerRegistrationData>({});
  const toastData = useToast();
  const { companyUuid } = useParams();
  const baseRoute = `/${companyUuid}${TRAILERS}`;
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

            const response = await saveTrailer(trailerData, companyUuid!!);
            const errors = handleErrors(
              response,
              getBlankTrailerRegistrationErrors,
              () => false,
            );
            if (errors === null) {
              setTrailerErrorData(getBlankTrailerRegistrationErrors());
              setTrailerData({});
              navigate(baseRoute);
            } else if ("message" in errors) {
              setTrailerData({});
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
