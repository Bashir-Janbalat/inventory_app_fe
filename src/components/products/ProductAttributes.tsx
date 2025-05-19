import {ProductDTO} from "../../types/ProductDTO";
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import React, {useState} from "react";
import {AttributeDTO} from "../../types/AttributeDTO.ts";


interface productAttributesProps {
    product: ProductDTO;
    attributes: AttributeDTO[];
    onChange: (field: keyof ProductDTO, value: ProductDTO['productAttributes']) => void;
}

const ProductAttributes: React.FC<productAttributesProps> = ({product, attributes, onChange}) => {
    const [selectedAttributeId, setSelectedAttributeId] = useState<number | ''>('');


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
    const handleAddSelectedAttribute = () => {
        const attr = attributes.find(a => a.id === selectedAttributeId);
        if (!attr) return;

        const alreadyExists = product.productAttributes.some(pa => pa.attributeName === attr.name);
        if (alreadyExists) return;

        const newAttribute = {
            attributeID: attr.id,
            attributeName: attr.name,
            attributeValue: '',
            isInitial: false,
        };

        const updatedAttributes = [newAttribute, ...product.productAttributes];
        onChange('productAttributes', updatedAttributes);
        setSelectedAttributeId('');
    };

    return (
        <>
            <Grid size={{xs: 12}}>
                <Grid container spacing={2}>
                    <Grid size={{xs: 12, sm: 6}} sx={{mb: 2}}>
                        <FormControl fullWidth>
                            <InputLabel id="attribute-select-label">Select Attribute</InputLabel>
                            <Select
                                labelId="attribute-select-label"
                                value={selectedAttributeId}
                                label="Select Attribute"
                                onChange={(e) => setSelectedAttributeId(Number(e.target.value))}
                            >
                                {attributes.map(attr => (
                                    <MenuItem key={attr.id} value={attr.id}>
                                        {attr.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{xs: 12, sm: 6}}>
                        <Button
                            variant="outlined"
                            onClick={handleAddSelectedAttribute}
                            disabled={selectedAttributeId === ''}
                        >
                            Add exists Attribute
                        </Button>
                    </Grid>
                </Grid>
                {product.productAttributes.map((attr, index) => (
                    <Grid container spacing={1} key={index}>
                        <Grid size={{xs: 12, sm: 6}}>
                            <TextField
                                label="Attribute Name"
                                name="attributeName"
                                value={attr.attributeName}
                                onChange={(e) => handleAttributeChange(index, e)}
                                fullWidth
                                required
                                slotProps={{
                                    input: {
                                        readOnly: attr.isInitial,
                                    },
                                }}
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
                        <Grid size={{xs: 12}} sx={{mb: 2}}>
                            <Button color="error" variant='outlined' onClick={() => handleDeleteAttribute(index)}>Remove</Button>
                        </Grid>
                    </Grid>
                ))}
                <Button variant="outlined" onClick={addAttribute}>
                    Add new Attribute
                </Button>
            </Grid>
        </>
    );
}
export default ProductAttributes;