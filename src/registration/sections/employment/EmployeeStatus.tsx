import { SelectForm } from "../../../global/SelectForm.tsx";
import * as React from "react";
import { useState } from "react";
import { SectionDivision } from "../SectionDivision.tsx";
import { RegistrationContext } from "../../../context/RegistrationContext.ts";
import {
  PositionEnum,
  RoleEnum,
} from "../../../types/registration/registration-data.ts";
import { BLANK_STRING } from "../../../utils/constants/global.ts";
import { LiveSearchEndpoints } from "../../../types/forms.ts";
import { LiveSearchInputForm } from "../../../global/LiveSearchInputForm.tsx";
import type { UserData } from "../../../types/api/registration-api.ts";
import {
  alterSupervisor,
  getFullName,
  prepopulatePosition,
  prepopulateRole,
  prepopulateSupervisor,
} from "../../../utils/registration/registration.ts";

export const EmployeeStatus = () => {
  const context = React.useContext(RegistrationContext)!;
  const { registrationData, setRegistrationData, registrationDataError } =
    context;
  const [isStatusDataExpanded, setIsStatusDataExpanded] = useState(true);

  return (
    <>
      <SectionDivision
        division="Status"
        isExpanded={isStatusDataExpanded}
        setIsExpanded={setIsStatusDataExpanded}
      />
      {isStatusDataExpanded && (
        <div className="flex flex-col gap-y-5">
          <div className="flex flex-row gap-x-15">
            <SelectForm
              label="Role"
              formWidth="w-25"
              initialValue={registrationData.role}
              data={Object.values(RoleEnum)}
              setElement={(role) => prepopulateRole(setRegistrationData, role)}
            />
            <SelectForm
              label="Position"
              formWidth="w-45"
              initialValue={registrationData.position}
              data={Object.values(PositionEnum)}
              setElement={(position) =>
                prepopulatePosition(setRegistrationData, position)
              }
            />
          </div>
          <LiveSearchInputForm
            label="Supervisor"
            placeholder="John Doe"
            value={registrationData.supervisor?.name ?? BLANK_STRING}
            endpoint={LiveSearchEndpoints.USER}
            searchField="fullName"
            isMandatory={false}
            errorText={registrationDataError.supervisor}
            saveData={(userData: UserData) =>
              alterSupervisor(setRegistrationData, userData)
            }
            renderResult={(userData: UserData) => getFullName(userData)}
            getKey={(userData) => userData.uuid}
            prepopulate={(supervisorName) =>
              prepopulateSupervisor(setRegistrationData, supervisorName)
            }
          />
        </div>
      )}
    </>
  );
};
