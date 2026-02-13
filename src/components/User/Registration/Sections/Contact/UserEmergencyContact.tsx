import { useContext } from "react";
import { UserRegistrationContext } from "../../../../../context/UserRegistrationContext.ts";
import {
  EMERGENCY_CONTACT_NAME_PLACEHOLDER,
  PHONE_NUMBER_PLACEHOLDER,
  EMERGENCY_CONTACT_RELATIONSHIP_PLACEHOLDER,
} from "../../../../../constants/common/placeholder-constants.ts";
import { TextualInputForm } from "../../../../Common/InputForm/public/TextualInputForm.tsx";
import { setEmergencyContactField } from "../../../../../utils/user/user-registration-utils.ts";

export const UserEmergencyContact = () => {
  const context = useContext(UserRegistrationContext)!;
  const { registrationData, setRegistrationData } = context;

  return (
    <>
      <div className="flex gap-5.5 mb-10">
        <TextualInputForm
          label="Name"
          placeholder={EMERGENCY_CONTACT_NAME_PLACEHOLDER}
          inputFieldValue={registrationData.emergencyContact.name}
          saveInputData={(value: string) =>
            setEmergencyContactField(setRegistrationData, "name", value)
          }
        />
        <TextualInputForm
          label="Relationship"
          placeholder={EMERGENCY_CONTACT_RELATIONSHIP_PLACEHOLDER}
          inputFieldValue={registrationData.emergencyContact.relationship}
          information="The relationship between the employee and the person that was registered as the Emergency Contact."
          saveInputData={(value: string) =>
            setEmergencyContactField(setRegistrationData, "relationship", value)
          }
        />
        <TextualInputForm
          label="Phone Number"
          placeholder={PHONE_NUMBER_PLACEHOLDER}
          inputFieldValue={registrationData.emergencyContact.phone}
          saveInputData={(value: string) =>
            setEmergencyContactField(setRegistrationData, "phone", value)
          }
        />
      </div>
    </>
  );
};
