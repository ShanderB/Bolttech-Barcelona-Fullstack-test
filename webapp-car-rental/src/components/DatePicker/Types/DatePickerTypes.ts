export interface CustomDatePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  isDarkMode?: boolean;
}

export enum DatePickerColors {
  DarkBackground = '#333',
  LightBackground = '#fff',
  DarkText = '#fff',
  LightText = '#000',
  DarkBorder = '#555',
  LightBorder = '#ccc',
}