import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import './customTable.css';
import { CustomTableProps, TableColors } from './Types/TableTypes';

const CustomTable = <T extends { [key: string]: any }>({
    data,
    columns,
    onRowClick,
    isDarkMode = false,
}: CustomTableProps<T>) => {
    return (
        <TableContainer
            component={Paper}
            style={{ backgroundColor: isDarkMode ? TableColors.DarkBackground : TableColors.LightBackground }}
        >
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={String(column.key)}
                                style={{
                                    borderBottom: 'none',
                                    color: isDarkMode ? TableColors.TextDark : TableColors.TextLight,
                                }}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow
                            key={index}
                            onClick={() => {
                                if (row.stock && onRowClick) onRowClick(row);
                            }}
                            style={{
                                cursor: row.stock ? 'pointer' : 'not-allowed',
                                backgroundColor: row.stock
                                    ? (isDarkMode ? TableColors.DarkRow : TableColors.LightRow)
                                    : (isDarkMode ? TableColors.DisabledDark : TableColors.DisabledLight),
                                color: isDarkMode ? TableColors.TextDark : TableColors.TextLight,
                            }}
                            onMouseEnter={(e) => {
                                if (row.stock) {
                                    e.currentTarget.style.backgroundColor = isDarkMode
                                        ? TableColors.DarkHover
                                        : TableColors.LightHover;
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (row.stock) {
                                    e.currentTarget.style.backgroundColor = isDarkMode
                                        ? TableColors.DarkRow
                                        : TableColors.LightRow;
                                } else {
                                    e.currentTarget.style.backgroundColor = isDarkMode
                                        ? TableColors.DisabledDark
                                        : TableColors.DisabledLight;
                                }
                            }}
                        >
                            {columns.map((column) => (
                                <TableCell key={String(column.key)} style={{
                                    borderBottom: 'none',
                                    color: isDarkMode ? TableColors.TextDark : TableColors.TextLight,
                                }}>
                                    {row[column.key]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CustomTable;