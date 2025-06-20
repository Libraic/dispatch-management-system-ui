import { SelectForm } from "../../../global/SelectForm.tsx";
import * as React from "react";
import { useState } from "react";
import { SectionDivision } from "../SectionDivision.tsx";
import { RegistrationContext } from "../../../context/RegistrationContext.ts";
import {
  PositionEnum,
  RoleEnum,
} from "../../../types/registration/registration-data.ts";
import { BLANK_STRING } from "../../../utils/global-constants.ts";
import { LiveSearchEndpoints } from "../../../types/forms.ts";
import { LiveSearchInputForm } from "../../../global/LiveSearchInputForm.tsx";
import type { UserData } from "../../../types/api/registration-api.ts";

export const EmployeeStatus = () => {
  const context = React.useContext(RegistrationContext)!;
  const { registrationData, setRegistrationData } = context;
  const [isStatusDataExpanded, setIsStatusDataExpanded] = useState(true);

  const getFullName = (user: UserData) => {
    return user.nickname !== null
      ? `${user.firstName} "${user.nickname}" ${user.lastName}`
      : `${user.firstName} ${user.lastName}`;
  };
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
              setElement={(value) =>
                setRegistrationData((prev) => ({ ...prev, role: value }))
              }
            />
            <SelectForm
              label="Position"
              formWidth="w-45"
              initialValue={registrationData.position}
              data={Object.values(PositionEnum)}
              setElement={(value) =>
                setRegistrationData((prev) => ({ ...prev, position: value }))
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
            saveData={(userData: UserData) => {
              setRegistrationData((prev) => ({
                ...prev,
                supervisor: {
                  uuid: userData.uuid,
                  name: getFullName(userData),
                },
              }));
            }}
            renderResult={(userData: UserData) => getFullName(userData)}
            getKey={(userData) => userData.uuid}
            prepopulate={(value: string) => {
              setRegistrationData((prev) => ({
                ...prev,
                supervisor: {
                  uuid: BLANK_STRING,
                  name: value,
                },
              }));
            }}
          />
        </div>
      )}
    </>
  );
};
