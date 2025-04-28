import React, {useEffect, useState} from 'react';
import {Card, CardContent, CircularProgress, Container, Grid, Typography} from '@mui/material';
import {CategoryDTO} from '../types/CategoryDTO';
import {getCategories} from '../api/CategoryApi.ts';

const Categories: React.FC = () => {
    const [categories, setCategories] = useState<CategoryDTO[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data.content);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return (
            <Container sx={{textAlign: 'center', py: 4}}>
                <CircularProgress/>
            </Container>
        );
    }

    return (
        <Container sx={{py: 4, pt: {xs: '80px', sm: '80px'}}}>
            <Typography variant="h4" sx={{mb: 4, fontWeight: 'bold'}}>
                Categories
            </Typography>
            <Grid container spacing={3}>
                {categories.map((category) => (
                    <Grid size={{xs: 12, sm: 6, md: 4}} key={category.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {category.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Categories;
