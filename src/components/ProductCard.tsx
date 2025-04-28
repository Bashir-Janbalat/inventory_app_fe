import React from 'react';
import { ProductDTO } from '../types/ProductDTO.ts';
import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';

interface ProductCardProps {
    product: ProductDTO;
    onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
    return (
        <Card
            onClick={onClick}
            raised
            sx={{
                width: '100%',
                maxWidth: 300,
                height: 500,
                display: 'flex',
                flexDirection: 'column',
                margin: 2,
                overflow: 'hidden',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 6,
                    cursor: 'pointer',
                },
            }}
        >
            <CardMedia
                component="img"
                height="200"
                image={product.images[0]?.imageUrl || '/default-image.jpg'}
                alt={product.images[0]?.altText || product.name}
                sx={{ objectFit: 'cover', flexShrink: 0 }}
            />

            <CardContent
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: 2,
                }}
            >
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        height: 50,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
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
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3,
                        marginBottom: 2,
                    }}
                >
                    {product.description || "No description available."}
                </Typography>

                <Typography
                    variant="h6"
                    color="text.primary"
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                        marginBottom: 1,
                    }}
                >
                    ${product.price.toFixed(2)}
                </Typography>
            </CardContent>

            <Box sx={{ p: 1 }}>
                <Button variant="contained" color="primary" fullWidth>View Details</Button>
            </Box>
        </Card>
    );
};

export default ProductCard;
