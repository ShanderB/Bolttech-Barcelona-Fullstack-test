import './datePicker.css';
import React from 'react';
import { TextField } from '@mui/material';
import { CustomDatePickerProps } from './Types/DatePickerTypes';

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ label, value, onChange, isDarkMode = false }) => {
  return (
    <div className="custom-date-picker-container">
      <TextField
        label={label}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        InputLabelProps={{ shrink: true }}
        className={`custom-date-picker ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
      />
    </div>
  );
};

export default CustomDatePicker;