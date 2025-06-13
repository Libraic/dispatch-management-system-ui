import { SelectForm } from "../../../global/SelectForm.tsx";
import { PositionEnum, RoleEnum } from "../../../types/authentication.ts";
import * as React from "react";
import { useState } from "react";
import { SectionDivision } from "../SectionDivision.tsx";
import { RegistrationContext } from "../../../context/RegistrationContext.ts";

export const EmployeeStatus = () => {
  const context = React.useContext(RegistrationContext);
  if (context === undefined) {
    throw new Error("Context is undefined");
  }
  const { registrationData, setRegistrationData } = context;
  const [isStatusDataExpanded, setIsStatusDataExpanded] = useState(true);
  return (
    <>
      <SectionDivision
        division="Status"
        isExpanded={isStatusDataExpanded}
        setIsExpanded={setIsStatusDataExpanded}
      />
      {isStatusDataExpanded && (
        <div className="flex flex-row gap-x-10">
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
      )}
    </>
  );
};
