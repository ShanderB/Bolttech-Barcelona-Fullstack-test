export interface CustomTableProps<T> {
    data: T[];
    columns: { key: keyof T; label: string }[];
    onRowClick?: (row: T) => void;
    isDarkMode?: boolean;
}

export enum TableColors {
    DarkBackground = '#333',
    DarkRow = '#444',
    DarkHover = '#555',
    LightBackground = '#fff',
    LightRow = '#f5f5f5',
    LightHover = '#e0e0e0',
    DisabledDark = '#333',
    DisabledLight = '#ddd',
    TextDark = '#fff',
    TextLight = '#000',
}