import {ProductDTO} from "../../types/ProductDTO";
import { Grid, TextField, Button } from "@mui/material";
import React from "react";


interface ProductImagesProps {
    product: ProductDTO;
    onChange: (field: keyof ProductDTO, value:ProductDTO['images']) => void;
}

const ProductImages: React.FC<ProductImagesProps> = ({product, onChange}) => {
    const handleImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const updatedImages = [...product.images];
        updatedImages[index] = {
            ...updatedImages[index],
            [name]: value,
        };
        onChange('images', updatedImages);
    };

    const handleDeleteImage = (index: number) => {
        const updatedImages = product.images.filter((_, i) => i !== index);
        onChange('images', updatedImages);
    };

    const addImage = () => {
        const newImage = {imageUrl: '', altText: ''};
        const updatedImages = [...product.images, newImage];
        onChange('images', updatedImages);
    };


    return (
        <>
            <Grid size={{xs: 12}}>
                {product.images.map((img, index) => (
                    <Grid container spacing={1} key={index}>
                        <Grid size={{xs: 12, sm: 6}}>
                            <TextField
                                label="Image URL"
                                name="imageUrl"
                                value={img.imageUrl}
                                onChange={(e) => handleImageChange(index, e)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid size={{xs: 12, sm: 6}}>
                            <TextField
                                label="Alt Text"
                                name="altText"
                                value={img.altText}
                                onChange={(e) => handleImageChange(index, e)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid size={{xs: 12}} sx={{mb: 2}}>
                            <Button color="error" variant='outlined' onClick={() => handleDeleteImage(index)}>Remove</Button>
                        </Grid>
                    </Grid>
                ))}
                <Button variant="outlined" onClick={addImage}>
                    Add Image
                </Button>
            </Grid>
        </>
    );
}
export default ProductImages;