import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import type { DateObject } from "../types/global.ts";

export const DatePick: React.FC<{ label: string; date: DateObject }> = ({
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
        slotProps={{ textField: { variant: "outlined" } }}
      />
    </LocalizationProvider>
  );
};
