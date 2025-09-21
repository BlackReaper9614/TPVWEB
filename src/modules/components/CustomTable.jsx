import { Box, Pagination, Table, TableBody, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    }
}));


export const CustomTable = ({ columns, data }) => {

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (

        <Box
            sx={
                (theme) => ({
                    border: `2px solid ${theme.palette.primary.main}`,
                })
            }
        >

            <TableContainer 
                sx={{
                    mb:'2%'
                }}
            >

                <Table>

                    <TableHead>

                        {

                            table.getHeaderGroups().map(headerGroup => (

                                <TableRow key={headerGroup.id}>

                                    {
                                        headerGroup.headers.map(header => (

                                            <StyledTableCell align='center' key={header.id}>

                                                {

                                                    flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext(),
                                                    )

                                                }

                                            </StyledTableCell>

                                        ))

                                    }





                                </TableRow>

                            ))

                        }

                    </TableHead>

                    <TableBody>

                        {

                            table.getRowModel().rows.map(row => (

                                <TableRow>

                                    {

                                        row.getVisibleCells().map(cell => (

                                            <TableCell key={cell.id} align='center'>

                                                {

                                                    flexRender(cell.column.columnDef.cell.getContext())

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
            
            <Box
                sx={{
                    justifyItems:'center',
                    mb: '2%'
                }}
            >

                <Pagination count={10} variant="outlined" color="primary" />

            </Box>

        </Box>

    )

}