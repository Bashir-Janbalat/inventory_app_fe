import {FormField} from "../../types/FormField.ts";
import CreateComponent from "../common/CreateComponent.tsx";
import {PageType} from "../../types/PageType.ts";
import React from "react";
import {createBrand} from "../../api/BrandApi.ts";
import {BrandDTO} from "../../types/BrandDTO.ts";
import {useNavigate} from "react-router-dom";

const CreateBrand: React.FC = () => {
    const navigate = useNavigate();

    const brandFields: FormField[] = [
        {name: 'name', label: 'Brand Name', required: true}];

    const handleCreateBrand = async (values: Record<string, string>) => {
        const brand: BrandDTO = { name: values.name };

        const apiResponse = await createBrand(brand);

        if (apiResponse.statusCode === 201) {
            navigate("/brands");
        } else {
            throw new Error(apiResponse.message || "Unexpected error occurred while creating the brand.");
        }
    };

    return (
        <CreateComponent
            page={PageType.createBrand}
            title="Create a new brand"
            fields={brandFields}
            onSubmit={handleCreateBrand}
            submitButtonText={'Create'}
        />
    );
};

export default CreateBrand;