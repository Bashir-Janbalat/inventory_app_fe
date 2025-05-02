import React from 'react';
import {CategoryDTO} from '../../types/CategoryDTO.ts';
import {Button, Card, CardContent, Container, Grid, Pagination, Stack, Typography} from '@mui/material';
import {CustomGridProps} from "../../types/CustomGridProps.ts";
import AddIcon from "@mui/icons-material/Add";
import ActionButtons from "../common/ActionButtonsProps.tsx";
import { useNavigate } from 'react-router-dom';


const CategoryList: React.FC<CustomGridProps<CategoryDTO>> = ({items, page, setPage, totalPages}) => {
    const navigate = useNavigate();

    function goToCreateCategory() {
        navigate('/createCategory');
    }
    function handleDeleteCategory() {
        console.log('Delete Category');
    }

    return (
        <Container>
            <Typography variant="h4" sx={{mb: 4, fontWeight: 'bold'}}>
                Categories
            </Typography>
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

                {items.map((category) => (
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
                                <Typography variant="h6" gutterBottom>
                                    {category.name}
                                </Typography>
                            </CardContent>
                        </Card>
                        <ActionButtons id={category.id!}
                                       onDelete={handleDeleteCategory}
                                       navigateTo={`/categories/update/`+ category.id}
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
        </Container>
    );
};

export default CategoryList;
