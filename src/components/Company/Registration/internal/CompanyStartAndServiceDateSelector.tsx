import { useContext } from "react";
import { CompanyRegistrationContext } from "../../../../context/CompanyRegistrationContext.ts";
import { DateSelector } from "../../../Common/Selector/DateSelector.tsx";

export const CompanyStartAndServiceDateSelector = () => {
  const context = useContext(CompanyRegistrationContext)!;
  const registrationData = context.registrationData;
  const setRegistrationData = context.setRegistrationData;
  return (
    <div className="flex flex-row gap-x-10 items-center">
      <DateSelector
        label="Service Date"
        setDate={(date: Date) => {
          setRegistrationData((prevData) => ({
            ...prevData,
            serviceDate: date,
          }));
        }}
        date={registrationData.serviceDate}
      />
      <DateSelector
        label="Start Date"
        setDate={(date: Date) => {
          setRegistrationData((prevData) => ({
            ...prevData,
            startDate: date,
          }));
        }}
        date={registrationData.startDate}
      />
    </div>
  );
};
