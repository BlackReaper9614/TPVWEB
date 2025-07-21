import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Switch } from '@mui/material';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Box, Container, IconButton, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useItemsStore } from '../hooks/useItemsStore';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const columnHelper = createColumnHelper();

export const Items = () => {

    const { items: defaultData, getItemsByUser, changeItemStatus } = useItemsStore();

    useEffect(() => {

        getItemsByUser();

    }, [])

    const [data, setData] = useState(() => [...defaultData]);

    const [deleteIndex, setDeleteIndex] = useState(null);

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDeleteConfirm = () => {

        setData((prev) => prev.filter((_, i) => i !== deleteIndex));

        setIsDialogOpen(false);

        setDeleteIndex(null);

    };

    const handleDeleteClick = (index) => {

        setDeleteIndex(index);

        setIsDialogOpen(true);

    };

    const handleDialogClose = () => {

        setIsDialogOpen(false);

        setDeleteIndex(null);

    }

    const onChangeStatus = (event, id) => {

        changeItemStatus(id, event.target.checked);
        
    }

    const columns = [
        columnHelper.accessor('idItem', {
            header: 'ID',
            footer: info => info.column.idItem,
            cell: info => info.row.original.idItem,
        }),
        columnHelper.accessor('itemName', {
            header: 'Nombre',
            footer: info => info.column.itemName,
            cell: info => info.row.original.itemName, // esto accede al JSX directamente
        }),
        columnHelper.accessor('edit', {
            header: 'Editar',
            footer: info => info.column.id,
            cell: () => (

                <IconButton>

                    <EditSquareIcon />

                </IconButton>

            )
        }),
        columnHelper.display({
            id: 'delete',
            header: 'Borrar',
            cell: ({ row }) => (

                row.original.idStatus == 1 ?
                    <Switch 
                        defaultChecked  
                        onChange={ (event) => onChangeStatus(event, row.original.idItem) } 
                    />
                :
                    <Switch 
                        onChange={ (event) => onChangeStatus(event, row.original.idItem) } 
                    />
                
            )
        }),
    ];

    const table = useReactTable({
        data: defaultData,
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

                            {
                                table.getHeaderGroups().map(headerGroup => (

                                    <TableRow key={headerGroup.id}>

                                        {

                                            headerGroup.headers.map(header => (

                                                <StyledTableCell align='center' key={header.id}>
                                                    
                                                    {
                                                        flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
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

            <Dialog open={isDialogOpen} onClose={handleDialogClose}>

                <DialogTitle>Confirmar eliminación</DialogTitle>

                <DialogContent>
                    ¿Estás seguro de que deseas eliminar este elemento?
                </DialogContent>

                <DialogActions>

                    <Button onClick={handleDialogClose}>Cancelar</Button>

                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                        Eliminar
                    </Button>

                </DialogActions>

            </Dialog>

        </Container>

    )

};