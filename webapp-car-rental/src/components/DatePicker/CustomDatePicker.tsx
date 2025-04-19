import React from 'react';
import { TextField } from '@mui/material';
import { CustomDatePickerProps, DatePickerColors } from './Types/DatePickerTypes';
import './datePicker.css';

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ label, value, onChange, isDarkMode = false }) => {
  return (
    <div
      className="custom-date-picker-container"
      style={{
        backgroundColor: isDarkMode ? DatePickerColors.DarkBackground : DatePickerColors.LightBackground,
      }}
    >
      <TextField
        label={label}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        slotProps={{
          inputLabel: {
            shrink: true,
            style: {
              color: isDarkMode ? DatePickerColors.DarkText : DatePickerColors.LightText,
            },
          },
          input: {
            style: {
              color: isDarkMode ? DatePickerColors.DarkText : DatePickerColors.LightText,
            },
          },
        }}
      />
    </div>
  );
};

export default CustomDatePicker;