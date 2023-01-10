import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

function FDatePicker({ name, ...others }) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={value}
              onChange={onChange}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  />
                );
              }}
              {...others}
            />
          </LocalizationProvider>
        );
      }}
    />
  );
}

export default FDatePicker;
