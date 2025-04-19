export interface CustomTableProps<T> {
    data: T[];
    columns: { key: keyof T; label: string }[];
    onRowClick?: (row: T) => void;
    isDarkMode?: boolean;
}