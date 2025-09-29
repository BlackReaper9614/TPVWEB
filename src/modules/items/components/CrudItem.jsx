import { Box, Button, FormControl, Input, InputLabel, MenuItem, Modal, Select, TextField, Typography, useTheme } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useUnitMeasures } from '../../unitMeasures/hooks/useUnitMeasures';
import { useEffect } from 'react';
import { useFamiliesStore } from '../../families/hooks/useFamiliesStore';
import { useSubfamiliesStore } from '../../subfamilies/hooks/useSubfamiliesStore';

export const CrudItem = ({ open, handleClose }) => {

    const theme = useTheme();

    const itemsSchema = yup.object().shape({
        itemInternalCode: yup.string(),
        itemCodeBar: yup.string(),
        name: yup.string().required("El nombre es obligatorio")
    });

    const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
        resolver: yupResolver(itemsSchema),
    });

    const { startLoadingUnitMeasures, unitMeasuresList } = useUnitMeasures()

    useEffect(() => {

        startLoadingUnitMeasures();

    }, []);

    const { startLoadingFamilies, familiesList } = useFamiliesStore();

    useEffect(() => {

        startLoadingFamilies();

    }, []);


    const { startLoadingSubfamiliesByFamily, subfamiliesList } = useSubfamiliesStore();

    const onChangeItemFamily = async (event) => {

        const selectedFamily = event.target.value;

        startLoadingSubfamiliesByFamily(selectedFamily);

    }

    const onSubmitItemsForm = () => {

    };

    return (

        <Modal
            open={open}
            onClose={handleClose}
        >

            <Box
                sx={{
                    backgroundColor: theme.palette.primary,
                    border: `2px solid ${theme.palette.primary.main}`,
                    borderRadius: 3,
                    boxShadow: 24,
                    display: 'flex',
                    flexDirection: 'column',
                    left: '50%',
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    position: 'absolute',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '50%'
                }}
            >

                <form>

                    {/* Titulo del modal */}
                    <Box
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            borderRadius: 2,
                            textAlign: 'center',
                            padding: '2%'
                        }}
                    >

                        <Typography
                            sx={{
                                color: theme.palette.getContrastText(theme.palette.primary.main),
                            }}
                            variant='h5'
                        >
                            Nuevo artículo
                        </Typography>

                    </Box>

                    {/* Formulario de artículos */}
                    <Box
                        sx={{
                            flex: 1,
                            m: '3%',
                            overflowY: 'auto',
                            overflowX: 'hidden'
                        }}
                    >

                        <TextField
                            {...register("itemInternalCode")}
                            autoComplete="false"
                            fullWidth={true}
                            label="Código interno"
                            size="small"
                            sx={{
                                mb: '2%',
                                mt: '1%'
                            }}
                            variant='outlined'
                            type="text"
                        />

                        <TextField
                            {...register("itemCodebar")}
                            autoComplete="false"
                            fullWidth={true}
                            label="Código de barras"
                            size="small"
                            sx={{
                                mb: '2%',
                            }}
                            type="text"
                            variant='outlined'
                        />

                        <TextField
                            {...register("itemName")}
                            autoComplete="false"
                            fullWidth={true}
                            label="Nombre del artículo"
                            size="small"
                            sx={{
                                mb: '2%',
                            }}
                            type="text"
                            variant='outlined'
                        />

                        <TextField
                            {...register("purchaseCost")}
                            autoComplete="false"
                            label="Precio de compra"
                            fullWidth={true}
                            size="small"
                            sx={{
                                mb: '2%',
                            }}
                            type="number"
                            variant='outlined'
                        />

                        <TextField
                            {...register("sellCost")}
                            autoComplete="false"
                            fullWidth={true}
                            label="Precio de venta"
                            size="small"
                            sx={{
                                mb: '2%',
                            }}
                            type="number"
                            variant='outlined'
                        />

                        <TextField
                            {...register("itemBrand")}
                            autoComplete="false"
                            fullWidth={true}
                            label="Marca"
                            size="small"
                            sx={{
                                mb: '2%',
                            }}
                            type='text'
                            variant='outlined'
                        />

                        <TextField
                            {...register("itemModal")}
                            autoComplete="false"
                            fullWidth={true}
                            label="Modelo"
                            size="small"
                            sx={{
                                mb: '2%',
                            }}
                            type='text'
                            variant='outlined'
                        />

                        <TextField
                            {...register("stock")}
                            autoComplete="false"
                            fullWidth={true}
                            label="Inventario"
                            size="small"
                            sx={{
                                mb: '2%',
                            }}
                            type='text'
                            variant='outlined'
                        />

                        {/* Unidades de medida */}
                        <FormControl
                            fullWidth={true}
                            sx={{
                                mb: '2%'
                            }}
                            error={errors.idUnitMeasure}
                        >

                            <InputLabel id="labelUnitMeasure">Unidad de medida</InputLabel>

                            <Controller
                                name='idUnitMeasure'
                                control={control}
                                defaultValue={0}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        labelid="labelUnitMeasure"
                                        id="selectIdUnitMeasure"
                                        label="Unidad de medida"
                                        size="small"
                                    >

                                        <MenuItem value={0}>Seleccione una unidad de medida</MenuItem>

                                        {

                                            unitMeasuresList.length > 1
                                            &&
                                            unitMeasuresList.map(item => (

                                                <MenuItem id={item.idUnitMeasure} value={item.idUnitMeasure}>
                                                    {item.unitName}
                                                </MenuItem>

                                            ))

                                        }

                                    </Select>
                                )}

                            />

                        </FormControl>

                        {/* Familias */}
                        <FormControl
                            fullWidth={true}
                            sx={{
                                mb: '2%'
                            }}
                            error={errors.idFamily}
                        >

                            <InputLabel id="labelFamilies">Familia del artículo</InputLabel>

                            <Controller
                                name='families'
                                control={control}
                                defaultValue={0}
                                render={({ field }) => (

                                    <Select
                                        {...field}
                                        labelid="labelFamilies"
                                        id="selectFamilies"
                                        label="Familia del artículo"
                                        onChange={(e) => {
                                            field.onChange(e);
                                            onChangeItemFamily(e);
                                        }}
                                        size="small"
                                    >

                                        <MenuItem value={0}>Seleccione una familia</MenuItem>

                                        {

                                            familiesList.length > 1
                                            &&
                                            familiesList.map(item => (

                                                <MenuItem id={item.idFamily} value={item.idFamily}>
                                                    {item.familyName}
                                                </MenuItem>

                                            ))

                                        }

                                    </Select>
                                )}

                            />

                        </FormControl>

                        {/* Subfamilias */}
                        <FormControl
                            fullWidth={true}
                            sx={{
                                mb: '2%'
                            }}
                            error={errors.idSubfamily}
                        >

                            <InputLabel id="labelSubfamilies">Subfamilia del artículo</InputLabel>

                            <Controller
                                name='subfamilies'
                                control={control}
                                defaultValue={0}
                                render={({ field }) => (

                                    <Select
                                        {...field}
                                        labelid="labelSubfamilies"
                                        id="selectSubFamilies"
                                        label="Subfamilia del artículo"
                                        size="small"
                                    >

                                        <MenuItem value={0}>Seleccione una subfamilia</MenuItem>

                                        {

                                            subfamiliesList.length > 1
                                            &&
                                            subfamiliesList.map(item => (

                                                <MenuItem id={item.idSubfamily} value={item.idSubfamily}>
                                                    {item.subfamilyName}
                                                </MenuItem>

                                            ))

                                        }

                                    </Select>
                                )}

                            />

                        </FormControl>

                    </Box>

                    {/* Bótones de acción */}
                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        sx={{
                            margin: '2%'
                        }}
                    >

                        <Button
                            color="success"
                            size='small'
                            sx={{
                                marginRight: '2%'
                            }}
                            variant='contained'
                        >
                            Aceptar
                        </Button>

                        <Button
                            color="error"
                            onClick={() => handleClose(false)}
                            size='small'
                            variant='contained'
                        >
                            Cancelar
                        </Button>

                    </Box>

                </form>

            </Box>

        </Modal>

    )

}
