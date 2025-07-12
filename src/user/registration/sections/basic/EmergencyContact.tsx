import * as React from "react";
import { useContext } from "react";
import { UserRegistrationContext } from "../../../../context/UserRegistrationContext.ts";
import { SectionDivision } from "../SectionDivision.tsx";
import { InputForm } from "../../../../global/InputForm.tsx";
import {
  EMERGENCY_CONTACT_NAME_PLACEHOLDER,
  EMERGENCY_CONTACT_PHONE_PLACEHOLDER,
  EMERGENCY_CONTACT_RELATIONSHIP_PLACEHOLDER,
} from "../../../../utils/constants/placeholders.ts";
import { setEmergencyContactField } from "../../../../utils/registration/user/user-registration.ts";

export const EmergencyContact = () => {
  const [isEmergencyContactExpanded, setIsEmergencyContactExpanded] =
    React.useState(true);
  const context = useContext(UserRegistrationContext)!;

  const { registrationData, setRegistrationData } = context;

  return (
    <>
      <SectionDivision
        division="Emergency Contact"
        isExpanded={isEmergencyContactExpanded}
        setIsExpanded={setIsEmergencyContactExpanded}
      />
      {isEmergencyContactExpanded && (
        <>
          <div className="flex gap-5.5 mb-10">
            <InputForm
              label="Name"
              placeholder={EMERGENCY_CONTACT_NAME_PLACEHOLDER}
              type="text"
              name="name"
              inputFieldValue={registrationData.emergencyContact.name}
              saveInputData={(value: string) =>
                setEmergencyContactField(setRegistrationData, "name", value)
              }
            />
            <InputForm
              label="Relationship"
              placeholder={EMERGENCY_CONTACT_RELATIONSHIP_PLACEHOLDER}
              type="text"
              name="relationship"
              inputFieldValue={registrationData.emergencyContact.relationship}
              information="The relationship between the employee and the person that was registered as the Emergency Contact."
              saveInputData={(value: string) =>
                setEmergencyContactField(
                  setRegistrationData,
                  "relationship",
                  value,
                )
              }
            />
            <InputForm
              label="Phone Number"
              placeholder={EMERGENCY_CONTACT_PHONE_PLACEHOLDER}
              type="text"
              name="phone-number"
              inputFieldValue={registrationData.emergencyContact.phone}
              saveInputData={(value: string) =>
                setEmergencyContactField(setRegistrationData, "phone", value)
              }
            />
          </div>
        </>
      )}
    </>
  );
};
