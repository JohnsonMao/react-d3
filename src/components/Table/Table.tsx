import React from 'react';
import Paper from '@mui/material/Paper';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ExcelJs from 'exceljs';

interface Column {
    id: 'name' | 'code' | 'population' | 'size' | 'density';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'name', label: 'Name', minWidth: 120 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 80 },
    {
        id: 'population',
        label: 'Population',
        minWidth: 120,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US')
    },
    {
        id: 'size',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 120,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US')
    },
    {
        id: 'density',
        label: 'Density',
        minWidth: 120,
        align: 'right',
        format: (value: number) => value.toFixed(2)
    }
];

interface Data {
    name: string;
    code: string;
    population: number;
    size: number;
    density: number;
}

function createData(name: string, code: string, population: number, size: number): Data {
    const density = population / size;
    return { name, code, population, size, density };
}

const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767)
];

const Table = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClick = () => {
        const workbook = new ExcelJs.Workbook();
        const sheet = workbook.addWorksheet('測試工作表名稱');

        sheet.properties.tabColor = { argb: 'FFFF8888' };
        sheet.addTable({
            name: 'mao',
            ref: 'A1',
            columns: columns.map((column) => ({ name: column.label })),
            rows: rows.map((row) => [row.name, row.code, row.population, row.size, row.density])
        });
        sheet.getCell('A2').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF0000FF' }
        };
        sheet.getRow(3).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF00FF00' }
        };

        workbook.xlsx.writeBuffer().then((content) => {
            const link = document.createElement('a');
            const blobData = new Blob([content]);
            link.download = '測試試算表.xlsx';
            link.href = URL.createObjectURL(blobData);
            link.click();
        });
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer>
                <MuiTable stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number'
                                                    ? column.format(value)
                                                    : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                    </TableBody>
                </MuiTable>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Box display="flex" justifyContent="flex-end">
                <Button variant="contained" onClick={handleClick}>
                    下載
                </Button>
            </Box>
        </Paper>
    );
};

export default Table;
