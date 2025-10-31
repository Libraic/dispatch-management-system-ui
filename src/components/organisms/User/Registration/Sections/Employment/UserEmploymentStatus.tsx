import { UserRegistrationContext } from "../../../../../../context/UserRegistrationContext.ts";
import * as React from "react";
import { SelectForm } from "../../../../../atoms/Selector/SelectForm.tsx";
import {
  PositionEnum,
  RoleEnum,
} from "../../../../../../types/internal/user/user-registration-types.ts";
import {
  alterSupervisor,
  cleanSupervisor,
  prepopulatePosition,
  prepopulateRole,
} from "../../../../../../utils/user/user-registration-utils.ts";
import { LiveSearchInputForm } from "../../../../LiveSearch/LiveSearchInputForm.tsx";
import { BLANK_STRING } from "../../../../../../constants/common/global-constants.ts";
import type { Renderable } from "../../../../../../types/internal/classes/Renderable.ts";
import { User } from "../../../../../../types/internal/classes/User.ts";
import { PageableEntity } from "../../../../../../types/api/common/api-query-types.ts";

export const UserEmploymentStatus = () => {
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
          entityType={PageableEntity.USER}
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
