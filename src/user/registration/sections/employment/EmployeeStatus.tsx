import { SelectForm } from "../../../../global/input-forms/SelectForm.tsx";
import * as React from "react";
import { UserRegistrationContext } from "../../../../context/UserRegistrationContext.ts";
import {
  PositionEnum,
  RoleEnum,
} from "../../../../types/registration/user/user-registration-data.ts";
import { BLANK_STRING } from "../../../../utils/constants/global-constants.ts";
import { LiveSearchInputForm } from "../../../../global/live-search/LiveSearchInputForm.tsx";
import {
  alterSupervisor,
  cleanSupervisor,
  prepopulatePosition,
  prepopulateRole,
} from "../../../../utils/user/user-registration.ts";
import type { Renderable } from "../../../../types/api/Renderable.ts";
import { User } from "../../../../types/api/User.ts";

export const EmployeeStatus = () => {
  const context = React.useContext(UserRegistrationContext)!;
  const { registrationData, setRegistrationData, registrationDataError } =
    context;

  return (
    <>
      <div className="flex flex-col gap-y-15">
        <div className="flex flex-row gap-x-15">
          <SelectForm
            label="Role"
            initialValue={registrationData.role}
            data={Object.values(RoleEnum)}
            setElement={(role) => prepopulateRole(setRegistrationData, role)}
          />
          <SelectForm
            label="Position"
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
          searchKey="USER"
          errorText={registrationDataError.supervisor}
          saveData={(userData: Renderable) =>
            alterSupervisor(setRegistrationData, userData)
          }
          cleanData={() => cleanSupervisor(setRegistrationData)}
          constructor={User}
        />
      </div>
    </>
  );
};
