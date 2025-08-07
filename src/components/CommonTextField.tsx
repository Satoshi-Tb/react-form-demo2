import React, { forwardRef } from "react";
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
  setFieldRef?: (name: string, element: HTMLElement | null) => void;
}

const CommonTextField = forwardRef<HTMLDivElement, CommonTextFieldProps>((
  {
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
    setFieldRef,
  },
  ref
) => {
  const handleRef = (element: HTMLDivElement | null) => {
    if (setFieldRef) {
      setFieldRef(name, element);
    }
    if (typeof ref === 'function') {
      ref(element);
    } else if (ref) {
      ref.current = element;
    }
  };

  return (
    <TextField
      ref={handleRef}
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
});

CommonTextField.displayName = 'CommonTextField';

export default CommonTextField;