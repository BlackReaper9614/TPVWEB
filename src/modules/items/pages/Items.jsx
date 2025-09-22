import { Box, Typography } from '@mui/material';
import { CustomTable } from '../../components/CustomTable';
import { createColumnHelper } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { useItemsStore } from '../hooks/useItemsStore';

const columnHelper = createColumnHelper();

const searchParamsInitial = {
    parameterType: 0,
    searchParameters: '',
    currentPage: 1,
    pageSize: 10
};

export const Items = () => {
    
    const { startGetItemsByParams, items, itemsListSize } = useItemsStore();

    const [searchParams, setsearchParams] = useState(searchParamsInitial);

    useEffect(() => {
        
        startGetItemsByParams(searchParams);

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

    const [currentPage, setCurrentPage] = useState(1);

    const onSubmitSearch = (event, page = currentPage) => {
        
        event.preventDefault();

        setsearchParams( {...searchParams, currentPage: page });

        startGetItemsByParams(searchParams);

        console.log(searchParams);

    }

    const handleChangePaginator = (event, value = 1) => {

        setCurrentPage(value);

        onSubmitSearch(event, value);

    }

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

            <CustomTable 
                columns={ columns }
                data={ items }
                listSize={ itemsListSize }
                currentPage={ currentPage }
                handleChangePaginator={ handleChangePaginator } 
            />

        </Box>

        </Box>

    )

}