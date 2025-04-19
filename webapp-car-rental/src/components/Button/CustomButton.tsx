import './button.css';
import React from 'react';
import { Button } from '@mui/material';
import { CustomButtonProps } from './Types/ButtonTypes';

const CustomButton: React.FC<CustomButtonProps> = ({ label, onClick, isCancel = false,className, fullWidth = false }) => {
  return (
    <div className={`custom-button-container ${className || ''}`}>
      <Button
        variant="contained"
        color={isCancel ? 'secondary' : 'primary'}
        onClick={onClick}
        className={`custom-button ${isCancel ? 'cancel-button' : 'normal-button'}`}
        style={{ width: fullWidth ? '100%' : 'auto' }}
      >
        {label}
      </Button>
    </div>
  );
};

export default CustomButton;