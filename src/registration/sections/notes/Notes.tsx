import { RegistrationSectionHeader } from "../../RegistrationSectionHeader.tsx";
import * as React from "react";
import type {
  RegistrationData,
  RegistrationDataError,
} from "../../../types/authentication.ts";
import { AddNote } from "./AddNote.tsx";

export const Notes: React.FC<{
  registrationData: RegistrationData;
  registrationDataError: RegistrationDataError;
  setRegistrationData: React.Dispatch<React.SetStateAction<RegistrationData>>;
}> = ({ registrationData, registrationDataError, setRegistrationData }) => {
  return (
    <div>
      <RegistrationSectionHeader
        header="Notes"
        subheader="Additional information about the employee"
      />
      <AddNote
        registrationData={registrationData}
        registrationDataError={registrationDataError}
        setRegistrationData={setRegistrationData}
      />
    </div>
  );
};
