import {ProductDTO} from "../../types/ProductDTO";
import {Button, Grid, IconButton, TextField} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";


interface productAttributesProps {
    product: ProductDTO;
    onChange: (field: keyof ProductDTO, value:  ProductDTO['productAttributes']) => void;
}

const productAttributes: React.FC<productAttributesProps> = ({product, onChange}) => {
    const handleAttributeChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        const updatedAttributes = [...product.productAttributes];
        updatedAttributes[index] = {
            ...updatedAttributes[index],
            [name]: value,
        };
        onChange('productAttributes', updatedAttributes);
    };

    const handleDeleteAttribute = (index: number) => {
        const updatedAttributes = product.productAttributes.filter((_, i) => i !== index);
        onChange('productAttributes', updatedAttributes);
    };

    const addAttribute = () => {
        const newAttribute = {attributeName: '', attributeValue: '', isInitial: false};
        const updatedAttributes = [...product.productAttributes, newAttribute];
        onChange('productAttributes', updatedAttributes);
    };


    return (
        <>
            <Grid size={{xs: 12}}>
                {product.productAttributes.map((attr, index) => (
                    <Grid container spacing={1} key={index}>
                        <Grid size={{xs: 12, sm: 6}}>
                            <TextField
                                disabled={attr.isInitial}
                                label="Attribute Name"
                                name="attributeName"
                                value={attr.attributeName}
                                onChange={(e) => handleAttributeChange(index, e)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid size={{xs: 12, sm: 6}}>
                            <TextField
                                label="Attribute Value"
                                name="attributeValue"
                                value={attr.attributeValue}
                                onChange={(e) => handleAttributeChange(index, e)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid size={{xs: 12, sm: 6}}>
                            <IconButton onClick={() => handleDeleteAttribute(index)} color="error" sx={{mt: 2}}>
                                <DeleteIcon/>
                            </IconButton>
                        </Grid>
                    </Grid>
                ))}
                <Button variant="outlined" onClick={addAttribute}>
                    Add Attribute
                </Button>
            </Grid>
        </>
    );
}
export default productAttributes;