import React, {useState} from 'react';
import {CategoryStatsDTO} from '../../types/CategoryDTO.ts';
import {Button, Card, CardContent, Container, Grid, Pagination, Stack, Typography} from '@mui/material';
import {CustomGridProps} from "../../types/CustomGridProps.ts";
import AddIcon from "@mui/icons-material/Add";
import ActionButtons from "../common/ActionButtonsProps.tsx";
import {useNavigate} from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import {deleteCategory} from "../../api/CategoryApi.ts";
import CustomSnackbar from "../common/CustomSnackbar.tsx";
import {DetailedApiError} from "../../errors/DetailedApiError.ts";


const CategoryList: React.FC<CustomGridProps<CategoryStatsDTO>> = ({items, page, setPage, totalPages}) => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<CategoryStatsDTO[]>(items);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success');

    function goToCreateCategory() {
        navigate('/createCategory');
    }

    const handleDeleteCategory = async (id: number) => {
        try {
            const status = await deleteCategory(id);
            if (status === 204) {
                setCategories((prevCategories) => prevCategories.filter((category) => category.id !== id));
                setSnackbarMessage('Category deleted successfully!');
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
                <Typography variant="h4" sx={{mb: 4, fontWeight: 'bold'}}>
                    Categories
                </Typography>
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<HomeIcon/>}
                    onClick={() => navigate('/products')}
                    sx={{height: 50}}
                >
                    Home
                </Button>
            </Stack>
            <Grid container spacing={3}>
                <Button fullWidth
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon/>}
                        style={{minHeight: 50}}
                        onClick={goToCreateCategory}
                >
                    Create
                </Button>

                {categories.map((category) => (
                    <Grid size={{xs: 12, sm: 6, md: 4}} key={category.id}>
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
                                    {category.name}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    <strong>Product count:</strong> {category.totalProducts}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    <strong>Brands count:</strong> {category.totalBrands}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    <strong>Total stock:</strong> {category.totalStockQuantity}
                                </Typography>
                            </CardContent>
                        </Card>
                        <ActionButtons id={category.id!}
                                       onDelete={handleDeleteCategory}
                                       navigateTo={`/categories/update/` + category.id}

                        />
                    </Grid>
                ))}
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

export default CategoryList;
