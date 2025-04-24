import React from 'react';
import { ProductDTO } from '../types/ProductDTO.ts';
import { Card, CardContent, Typography, Button, CardMedia } from '@mui/material';

interface ProductCardProps {
    product: ProductDTO;
    onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
    return (
        <Card sx={{ maxWidth: 345 }} onClick={onClick}>
            <CardMedia
                component="img"
                height="140"
                image={product.images[0]?.url}
                alt={product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.description}
                </Typography>
                <Typography variant="h6" color="text.primary" sx={{ mt: 2 }}>
                    ${product.price}
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                    View Details
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
