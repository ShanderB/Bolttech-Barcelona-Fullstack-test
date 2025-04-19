export interface CustomButtonProps {
    label: string;
    onClick: () => void;
    isCancel?: boolean;
    className?: string;
    fullWidth?: boolean;
}
