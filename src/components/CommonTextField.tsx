import React from "react";
import { TextField } from "@mui/material";
import { MemberFormData } from "../types/member";

interface CommonTextFieldProps {
  name: keyof MemberFormData;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  type?: string;
  multiline?: boolean;
  rows?: number;
  fullWidth?: boolean;
  gridArea?: string;
}

const CommonTextField: React.FC<CommonTextFieldProps> = ({
  name,
  label,
  value,
  onChange,
  error,
  required = false,
  type = "text",
  multiline = false,
  rows,
  fullWidth = true,
  gridArea,
}) => {
  return (
    <TextField
      name={name}
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={error}
      required={required}
      multiline={multiline}
      rows={rows}
      fullWidth={fullWidth}
      sx={{ gridArea }}
    />
  );
};

export default CommonTextField;