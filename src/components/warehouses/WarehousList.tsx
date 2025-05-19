import React, {useState} from 'react';
import {Button, Card, CardContent, Container, Grid, Pagination, Stack, Typography} from '@mui/material';
import {CustomGridProps} from "../../types/CustomGridProps";
import AddIcon from "@mui/icons-material/Add";
import {useNavigate} from "react-router-dom";
import ActionButtons from "../common/ActionButtonsProps";
import {DetailedApiError} from "../../errors/DetailedApiError";
import CustomSnackbar from "../common/CustomSnackbar";
import {deleteWarehous} from "../../api/WarehousApi.ts";
import {WarehouseStatsDTO} from "../../types/WarehouseDTO.ts";


const WarehousList: React.FC<CustomGridProps<WarehouseStatsDTO>> = ({items, totalPages, setPage, page}) => {
    const navigate = useNavigate();
    const [warehouses, setWarehouses] = useState<WarehouseStatsDTO[]>(items);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success');

    const goToCreateWarehous = () => {
        navigate('/createWarehouse');
    }

    const handleDeleteWarehous = async (id: number) => {
        try {
            const status = await deleteWarehous(id);
            if (status === 204) {
                setWarehouses((prevWarehouses) =>
                    prevWarehouses.filter((warehous) => warehous.id !== id));
                setSnackbarMessage('Warehous deleted successfully!');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
            }
        } catch (error) {
            if (error instanceof DetailedApiError) {
                setSnackbarMessage(error.message);
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            } else {
                throw error;
            }
        }
    }
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    return (
        <Container>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{mb: 4}}>
                <Typography variant="h4" sx={{fontWeight: 'bold'}}>
                    Warehouses
                </Typography>
            </Stack>
            <Grid container spacing={3}>
                <Button fullWidth
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon/>}
                        style={{minHeight: 50}}
                        onClick={goToCreateWarehous}
                >
                    Create
                </Button>
                <>
                    {warehouses.map((warehous) => (
                        <Grid size={{xs: 12, sm: 6, md: 4}} key={warehous.id}>
                            <Card sx={(theme) => ({
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                border: `1px solid ${theme.palette.divider}`,
                                boxShadow: theme.shadows[3],
                                borderRadius: 2,
                                padding: 2,
                                width: '100%',
                                backgroundColor: theme.palette.background.paper,
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: theme.shadows[6],
                                }
                            })}>
                                <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                                        {warehous.name}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        <strong>Address:</strong> {warehous.address}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        <strong>Product count:</strong> {warehous.productCount}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        <strong>Total stock:</strong> {warehous.totalStockQuantity}
                                    </Typography>
                                </CardContent>
                            </Card>
                            <ActionButtons id={warehous.id!}
                                           onDelete={handleDeleteWarehous}
                                           navigateTo={`/warehouses/update/` + warehous.id}
                            />
                        </Grid>
                    ))}
                </>
            </Grid>
            <Stack direction="row" justifyContent="center" alignItems="center" marginTop={4}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_event, value) => setPage(value)}
                    color="primary"
                    variant="outlined"
                    shape="rounded"
                />
            </Stack>
            <CustomSnackbar
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={handleSnackbarClose}
            />
        </Container>
    );
};

export default WarehousList;
