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
import { CustomTableProps } from './Types/TableTypes';

const CustomTable = <T extends { [key: string]: any }>({
    data,
    columns,
    onRowClick,
    isDarkMode = false,
}: CustomTableProps<T>) => {
    return (
        <TableContainer component={Paper} style={{ backgroundColor: isDarkMode ? '#333' : '#fff' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={String(column.key)}
                                style={{ borderBottom: 'none', color: isDarkMode ? '#fff' : '#000' }}
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
                                    ? (isDarkMode ? '#444' : '#f5f5f5')
                                    : (isDarkMode ? '#333' : '#ddd'),
                                color: isDarkMode ? '#fff' : '#000',
                            }}
                            onMouseEnter={(e) => {
                                if (row.stock) {
                                    e.currentTarget.style.backgroundColor = isDarkMode ? '#555' : '#e0e0e0';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (row.stock) {
                                    e.currentTarget.style.backgroundColor = isDarkMode ? '#444' : '#f5f5f5';
                                } else {
                                    e.currentTarget.style.backgroundColor = isDarkMode ? '#333' : '#ddd';
                                }
                            }}
                        >
                            {columns.map((column) => (
                                <TableCell key={String(column.key)} style={{ borderBottom: 'none' }}>
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