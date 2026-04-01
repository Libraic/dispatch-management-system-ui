import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { ErrorContainer } from "../InputForm/public/ErrorContainer.tsx";

export const DateSelector: React.FC<{
  label: string;
  date: Date;
  setDate: (date: Date) => void;
  errorMessage?: string;
}> = ({ label, date, setDate, errorMessage }) => {
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs()
      .set("date", date.getDate())
      .set("month", date.getMonth())
      .set("year", date.getFullYear()),
  );

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
    const date = new Date();
    if (newValue) {
      date.setDate(newValue.date());
      date.setMonth(newValue.month());
      date.setFullYear(newValue.year());
    }
    setDate(date);
  };

  return (
    <div className="flex flex-col min-h-[6.6rem]">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          value={value}
          onChange={handleChange}
          enableAccessibleFieldDOMStructure={false}
          slots={{ textField: TextField }}
          slotProps={{
            textField: {
              variant: "outlined",
              sx: {
                width: 280,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "25px",
                  "& fieldset": {
                    borderColor: "#f2f2f2",
                    borderWidth: "2px",
                  },
                  "&:hover fieldset": {
                    borderColor: "#f2f2f2",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#3a59d1",
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "1.15rem 1.2rem",
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: "0.85rem",
                  },
                },
                "& .MuiInputLabel-root": {
                  fontFamily: "'Inter Tight', sans-serif",
                  fontSize: "0.95rem",
                  fontWeight: 300,
                  color: "black",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#3a59d1",
                  fontWeight: 400,
                },
              },
            },
            day: {
              sx: {
                // Selected day
                "&.Mui-selected": {
                  backgroundColor: "#3a59d1",
                  color: "white",
                },
              },
            },
          }}
        />
      </LocalizationProvider>
      {errorMessage && <ErrorContainer errorMessage={errorMessage} />}
    </div>
  );
};
