import React from 'react';
import {Box, Button, Card, CardContent, CardMedia, Typography, useTheme} from '@mui/material';
import {ProductDTO} from '../../types/ProductDTO.ts';

interface ProductCardProps {
    product: ProductDTO;
    onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({product, onClick}) => {
    const theme = useTheme();

    return (
        <Card
            onClick={onClick}
            sx={{
                backgroundColor: theme.palette.mode === 'light' ? 'grey.100' : 'grey.800',
                xs: 12, sm: 6, md: 4, lg: 4, ml: 2, mr: 2, mb: 2,
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer',
                '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: 10,
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
                    height: {xs: 180, sm: 200, md: 220},
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
                        fontSize: {xs: '1rem', md: '1.1rem'},
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
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        minHeight: 60,
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
                        fontSize: {xs: '1.1rem', md: '1.2rem'},
                        mb: 2,
                    }}
                >
                    ${product.costPrice.toFixed(2)}
                </Typography>

                <Box sx={{mt: 'auto'}}>
                    <Button variant="contained" color="primary" fullWidth>
                        View Details
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
