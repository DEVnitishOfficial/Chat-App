import PropTypes, { func } from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";

// mui
import { TextField } from "@mui/material";

export default function RHFTextField({ home, helperText, ...other }) {
  const { control } = useFormContext();
  RHFTextField.propTypes = {
    name:PropTypes.string,
    helperText:PropTypes.node
  }
  return (
    <>
      <Controller
        // eslint-disable-next-line no-restricted-globals
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            fullWidth
            error={!!error}
            helperText={error ? error.message : helperText}
            {...other}
          />
        )}
      />
    </>
  );
}
