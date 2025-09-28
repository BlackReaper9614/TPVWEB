import { Box, Pagination, Table, TableBody, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.getContrastText(theme.palette.primary.main),
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    }
}));


export const CustomTable = ({ columns, data, listSize, currentPage, handleChangePaginator }) => {

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

                                <TableRow key={row.id}>

                                    {

                                        row.getVisibleCells().map(cell => (

                                            <TableCell key={cell.id} align='center'>

                                                {

                                                    flexRender(cell.column.columnDef.cell, cell.getContext() )

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

                <Pagination 
                    color="primary" 
                    count={listSize} 
                    defaultPage={1}
                    onChange={ handleChangePaginator }
                    page={ currentPage }
                    siblingCount={ 0 }
                    variant="outlined" 
                />

            </Box>

        </Box>

    )

}