import { Box, Typography } from '@mui/material';
import { CustomTable } from '../../components/CustomTable';
import { createColumnHelper } from '@tanstack/react-table';
import { useEffect } from 'react';

const columnHelper = createColumnHelper();

export const Items = () => {

    useEffect(() => {
        
        const searchParams = {
            parameterType: 0,
            searchParameter: ''
        };

    }, [] );

    const columns = [
        columnHelper.accessor('idItem', {
            header: 'ID',
            footer: info => info.column.idItem,
            cell: info => info.row.original.idItem
        }),
        columnHelper.accessor('itemInternalCode', {
            header: 'Código interno',
            footer: info => info.column.itemInternalCode,
            cell: info => info.row.original.itemInternalCode
        }),
        columnHelper.accessor('itemCodebar', {
            header: 'Código de barras',
            footer: info => info.column.itemCodebar,
            cell: info => info.row.original.itemCodebar
        }),
        columnHelper.accessor('itemName', {
            header: 'Nombre',
            footer: info => info.column.itemName,
            cell: info => info.row.original.itemName
        }),
        columnHelper.accessor('sealCost', {
            header: 'Precio de venta',
            footer: info => info.column.sellCost,
            cell: info => info.row.original.sellCost
        }),
        columnHelper.accessor('purchaseCost', {
            header: 'Precio de compra',
            footer: info => info.column.sellCost,
            cell: info => info.row.original.sellCost
        }),
        columnHelper.accessor('stock', {
            header: 'Stock',
            footer: info => info.column.stock,
            cell: info => info.row.original.stock
        }),
    ]

    return (

        <Box
            sx={{
                //border: 'solid 1px blue',
                //margin: '2%',
                padding: '2%'
            }}
        >

        <Box>

            <Typography 
                sx={{
                    mb:'2%'
                }}
                variant="h5"
            >
                Lista de artículos
            </Typography>

            <CustomTable columns={columns} data={[]} />

        </Box>

        </Box>

    )

}