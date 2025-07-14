import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { Box, Container, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const person = {
    firstName: '',
    lastName: '',
    age: 0,
    visits: 0,
    status: '',
    progress: 0
}

const defaultData = [
    {
        firstName: 'tanner',
        lastName: 'linsley',
        age: 24,
        visits: 100,
        status: 'In Relationship',
        progress: 50,
    },
    {
        firstName: 'tandy',
        lastName: 'miller',
        age: 40,
        visits: 40,
        status: 'Single',
        progress: 80,
    },
    {
        firstName: 'joe',
        lastName: 'dirte',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
]

const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor('firstName', {
        cell: info => info.getValue(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.lastName, {
        id: 'lastName',
        cell: info => <i>{info.getValue()}</i>,
        header: () => <span>Last Name</span>,
        footer: info => info.column.id,
    }),
    columnHelper.accessor('age', {
        header: () => 'Age',
        cell: info => info.renderValue(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor('visits', {
        header: () => <span>Visits</span>,
        footer: info => info.column.id,
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        footer: info => info.column.id,
    }),
    columnHelper.accessor('progress', {
        header: 'Profile Progress',
        footer: info => info.column.id,
    }),
];

export const Items = () => {

    const [data, _setData] = React.useState(() => [...defaultData]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (

        <Container fixed sx={{ m: 1 }}>

            <Typography variant='h5' sx={{ mb: 2 }}>
                Artículos
            </Typography>

            <Box sx={
                (theme) => ({
                    border: `2px solid ${theme.palette.primary.main}`,
                }
                )}
            >

                <TableContainer component={Paper}>

                    <Table aria-label='simple table'>

                        <TableHead>

                            <TableRow>

                                <StyledTableCell align='center'> Nombre </StyledTableCell>
                                <StyledTableCell align='center'> Precio </StyledTableCell>
                                <StyledTableCell align='center'> Tipo </StyledTableCell>
                                <StyledTableCell align='center'> Relación </StyledTableCell>
                                <StyledTableCell align='center'> Estatus </StyledTableCell>
                                <StyledTableCell align='center'> Visitas </StyledTableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {
                                table.getRowModel().rows.map(row => (

                                    <TableRow key={row.id}>

                                        {

                                            row.getVisibleCells().map(cell => (

                                                <TableCell key={cell.id} align='center'>

                                                    {

                                                        flexRender(cell.column.columnDef.cell, cell.getContext())

                                                    }

                                                </TableCell>

                                            ))

                                        }

                                    </TableRow>

                                ))

                            }

                        </TableBody>

                    </Table>

                </TableContainer>

            </Box>

        </Container>

    )

};