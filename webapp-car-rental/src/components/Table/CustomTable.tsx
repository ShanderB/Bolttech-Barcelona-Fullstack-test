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
import { useState } from 'react';

const CustomTable = <T extends { [key: string]: any }>({
    data,
    columns,
    onRowClick,
    isDarkMode = false,
}: CustomTableProps<T>) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseDown = () => {
        setIsDragging(false);
    };

    const handleMouseMove = () => {
        setIsDragging(true);
    };

    const handleMouseUp = (row: T) => {
        if (!isDragging && row.stock && onRowClick) {
            onRowClick(row);
        }
    };

    return (
        <TableContainer
            component={Paper}
            style={{ backgroundColor: isDarkMode ? TableColors.DarkBackground : TableColors.LightBackground }}
        >
            <Table
                style={{
                    tableLayout: 'fixed',
                }}
            >
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
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={() => handleMouseUp(row)}
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
                                    {column.key === 'carBase64' ? (
                                        <img
                                            src={`data:image/svg+xml;base64,${row[column.key]}`}
                                            style={{
                                                maxWidth: '31%',
                                                height: 'auto',
                                                maxHeight: '10%',
                                            }}
                                            alt="SVG"
                                        />
                                    ) : (
                                        row[column.key]
                                    )}
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