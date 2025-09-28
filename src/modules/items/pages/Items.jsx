import { Box, Button, Typography } from '@mui/material';
import { CustomTable } from '../../components/CustomTable';
import { createColumnHelper } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { useItemsStore } from '../hooks/useItemsStore';
import AddIcon from '@mui/icons-material/Add';
import { CrudItem } from '../components/CrudItem';

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

    }, []);

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

        setsearchParams({ ...searchParams, currentPage: page });

        startGetItemsByParams(searchParams);

        console.log(searchParams);

    }

    const handleChangePaginator = (event, value = 1) => {

        setCurrentPage(value);

        onSubmitSearch(event, value);

    }

    const [openCrudItem, setopenCrudItem] = useState(false)

    return (

        <>

            {/* Modal para manipular items */}
            <CrudItem 
                handleClose={ setopenCrudItem } 
                open={ openCrudItem } 
            />

            <Box
            
                sx={{
                    padding: '2%'
                }}
            >

                <Box>

                    <Box
                        display="flex"
                        justifyContent="space-between" // uno al inicio y otro al final
                        alignItems="center"
                        p={2}
                        height={100}
                    >

                        <Typography
                            sx={{
                                mb: '2%',
                                alignItems: 'center'
                            }}
                            variant="h5"
                        >
                            Lista de artículos
                        </Typography>

                        <Button
                            onClick={ () => setopenCrudItem(true) }
                            size='small'
                            variant='contained'
                        >

                            <AddIcon />

                            Nuevo artículo

                        </Button>

                    </Box>

                    <CustomTable
                        columns={columns}
                        data={items}
                        listSize={itemsListSize}
                        currentPage={currentPage}
                        handleChangePaginator={handleChangePaginator}
                    />

                </Box>

            </Box>

        </>

    )

}