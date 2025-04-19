export interface CustomDatePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  isDarkMode?: boolean;
}