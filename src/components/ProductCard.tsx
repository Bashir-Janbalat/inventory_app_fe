import React from 'react';
import {Box, Button, Card, CardContent, CardMedia, Grid, Typography} from '@mui/material';
import {ProductDTO} from '../types/ProductDTO.ts';

interface ProductCardProps {
    product: ProductDTO;
    onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({product, onClick}) => {
    return (
        <Box sx={{flexGrow: 1, width: '100%'}}>
            <Grid container spacing={2}>
                <Card
                    onClick={onClick}
                    raised
                    sx={{
                        width: '100%',
                        maxWidth: 300,
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        cursor: 'pointer',
                        '&:hover': {
                            transform: 'scale(1.03)',
                            boxShadow: 6,
                        },
                    }}
                >
                    <CardMedia
                        component="img"
                        image={product.images[0]?.imageUrl || '/default-image.jpg'}
                        alt={product.images[0]?.altText || product.name}
                        loading="lazy"
                        sx={{
                            width: '100%',
                            height: 200,
                            objectFit: 'cover',
                            flexShrink: 0,
                        }}
                    />

                    <CardContent
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            flexGrow: 1,
                            p: 2,
                        }}
                    >
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '1.1rem',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                mb: 1,
                            }}
                        >
                            {product.name}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                flexGrow: 1,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                mb: 2,
                            }}
                        >
                            {product.description || 'No description available.'}
                        </Typography>

                        <Typography
                            variant="h6"
                            color="text.primary"
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '1.2rem',
                                mb: 2,
                            }}
                        >
                            ${product.price.toFixed(2)}
                        </Typography>

                        <Box>
                            <Button variant="contained" color="primary" fullWidth>
                                View Details
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Box>

    );
};

export default ProductCard;
