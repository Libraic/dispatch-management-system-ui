import mandatoryFieldIcon from "../assets/global/mandatory-field.svg";

export const Information = () => {
  return (
    <div className="flex flex-row gap-x-1 mt-10">
      <img className="w-3" src={mandatoryFieldIcon} alt="Mandatory" />
      <p className="font-open-sans text-standard-size">
        The fields marked with asterisk are mandatory
      </p>
    </div>
  );
};
