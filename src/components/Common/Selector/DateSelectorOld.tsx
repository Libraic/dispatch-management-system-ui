import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import type { DateObject } from "../../../types/internal/time/date-types.ts";

// TODO: Replace all occurrences of `DateSelectorOld` with `DateSelector`.
export const DateSelectorOld: React.FC<{ label: string; date: DateObject }> = ({
  label,
  date,
}) => {
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs()
      .set("date", date.day)
      .set("month", date.month - 1)
      .set("year", date.year),
  );

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
    if (newValue) {
      date.setDay(newValue.date());
      date.setMonth(newValue.month() + 1);
      date.setYear(newValue.year());
    }
  };

  return (
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
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#3a59d1",
                },
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
              // Hover on the selected day
              "&.Mui-selected:hover": {
                backgroundColor: "#f2f2f2",
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};
