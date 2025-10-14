import { TruckCreationForm } from "./TruckCreationForm.tsx";
import { AssetCreationFormSelector } from "./AssetCreationFormSelector.tsx";
import { ASSET_CREATION_HEADER } from "../../../utils/constants/headers.ts";
import { PageHeader } from "../../../global/PageHeader.tsx";
import { TrailerCreationForm } from "./TrailerCreationForm.tsx";
import * as React from "react";
import { useState } from "react";
import {
  AssetTypeEnum,
  type TrailerRegistrationData,
  type TrailerRegistrationError,
  type TruckRegistrationData,
  type TruckRegistrationError,
} from "../../../types/assets/asset-data.ts";
import {
  getBlankTruckRegistrationData,
  getBlankTruckRegistrationErrors,
  getCreateTruckRequest,
} from "../../../utils/assets/truck-utils.ts";
import {
  getBlankTrailerRegistrationData,
  getBlankTrailerRegistrationErrors,
  getCreateTrailerRequest,
} from "../../../utils/assets/trailer-utils.ts";
import { SubmitButton } from "../../../button/SubmitButton.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { handleErrors } from "../../../utils/api/common-api-error-utils.ts";
import { useToast } from "../../../hooks/useToast.ts";
import { ToastRenderer } from "../../../toast/ToastRenderer.tsx";
import { CancelButton } from "../../../button/CancelButton.tsx";
import { saveTruck } from "../../../service/truck-service.ts";
import { saveTrailer } from "../../../service/trailer-service.ts";
import { validateTruckRegistrationData } from "../../../utils/assets/truck-error-utils.ts";
import { validateTrailerRegistrationData } from "../../../utils/assets/trailer-error-utils.ts";

export const AssetCreationForm = () => {
  const [assetType, setAssetType] = useState(AssetTypeEnum.TRUCK);
  const [truckData, setTruckData] = useState<TruckRegistrationData>(
    getBlankTruckRegistrationData(),
  );
  const [truckErrorData, setTruckErrorData] = useState<TruckRegistrationError>(
    getBlankTruckRegistrationErrors(),
  );
  const [trailerErrorData, setTrailerErrorData] =
    useState<TrailerRegistrationError>(getBlankTrailerRegistrationErrors());
  const [trailerData, setTrailerData] = useState<TrailerRegistrationData>(
    getBlankTrailerRegistrationData(),
  );
  const toastData = useToast();
  const { companyUuid } = useParams();
  const baseRoute = `/dashboard/${companyUuid}`;
  const navigate = useNavigate();

  const assetCreationForms: Record<AssetTypeEnum, React.ReactNode> = {
    [AssetTypeEnum.TRUCK]: (
      <TruckCreationForm
        truckData={truckData}
        truckRegistrationErrors={truckErrorData}
        setTruckData={setTruckData}
      />
    ),
    [AssetTypeEnum.TRAILER]: (
      <TrailerCreationForm
        trailerData={trailerData}
        trailerRegistrationErrors={trailerErrorData}
        setTrailerData={setTrailerData}
      />
    ),
  };

  return (
    <div className="flex flex-col items-center gap">
      <PageHeader headerInfo={ASSET_CREATION_HEADER} />
      <div className="flex flex-col items-center gap-y-[8rem]">
        <AssetCreationFormSelector
          assetType={assetType}
          setActiveCreationForm={setAssetType}
        />
        {assetCreationForms[assetType]}
      </div>
      <div className="flex flex-row items-center justify-center w-screen my-25 gap-x-10">
        <SubmitButton
          actionText="Submit"
          action={async () => {
            if (assetType === AssetTypeEnum.TRUCK) {
              const errorsPriorApiCall =
                validateTruckRegistrationData(truckData);
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
            } else if (assetType === AssetTypeEnum.TRAILER) {
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
            }
          }}
        />
        <CancelButton actionText="Quit" action={() => navigate(baseRoute)} />
      </div>
      <ToastRenderer toast={toastData} />
    </div>
  );
};
