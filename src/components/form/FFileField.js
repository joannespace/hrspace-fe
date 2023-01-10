import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import BtnUploadFile from "../BtnUploadFile";

function FFileField({ name, handleOpenPicker, type, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <TextField
            fullWidth
            error={!!error}
            helperText={error?.message}
            InputLabelProps={{
              shrink: true,
            }}
            {...field}
            {...other}
            value={field.value?.name ? field.value.name : ""}
            InputProps={{
              endAdornment: (
                <BtnUploadFile onChange={field.onChange} type={type} />
              ),
            }}
          />
        );
      }}
    />
  );
}

export default FFileField;
