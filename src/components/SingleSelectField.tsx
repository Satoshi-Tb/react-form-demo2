import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Select from "react-select";
import { SelectOption } from "../types/member";

interface SingleSelectFieldProps {
  name: string;
  label: string;
  options: SelectOption[];
  value: SelectOption | null;
  onChange: (selectedOption: SelectOption | null) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

const SingleSelectField: React.FC<SingleSelectFieldProps> = ({
  name,
  label,
  options,
  value,
  onChange,
  error,
  required = false,
  placeholder,
}) => {
  useEffect(() => {
    console.log(`SingleSelectField マウント: ${name}`);
    return () => {
      console.log(`SingleSelectField 破棄: ${name}`);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="body1" gutterBottom>
        {label} {required && "*"}
      </Typography>
      <Select
        name={name}
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        isClearable
      />
      {error && (
        <Typography variant="caption" color="error">
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default SingleSelectField;
