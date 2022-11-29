import React from "react";
import { useField } from "formik";
import { TextField } from "@mui/material";

const TextfieldWrapper = ({ name, ...otherProps }) => {
  const [field, mata] = useField(name);

  const configTextfield = {
    ...field,
    fullWidth: true,
    variant: "outlined",
    ...otherProps,
  };

  if (mata && mata.touched && mata.error) {
    configTextfield.error = true;
    configTextfield.helperText = mata.error;
  }

  return <TextField {...configTextfield} />;
};

export default TextfieldWrapper;
