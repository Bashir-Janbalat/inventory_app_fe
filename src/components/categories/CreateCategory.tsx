import {FormField} from "../../types/FormField.ts";
import CreateComponent from "../common/CreateComponent.tsx";
import {PageType} from "../../types/PageType.ts";
import React from "react";
import {useNavigate} from "react-router-dom";
import {createCategory} from "../../api/CategoryApi.ts";
import {CategoryDTO} from "../../types/CategoryDTO.ts";

const CreateCategory: React.FC = () => {
    const navigate = useNavigate();

    const categoryFields: FormField[] = [
        {name: 'name', label: ' Name', required: true}];

    const handleCreateCategory = async (values: Record<string, string>) => {
        const category: CategoryDTO = {name: values.name};
        const status = await createCategory(category);
        if (status === 201) {
            navigate("/categories");
        }
    };

    return (
        <CreateComponent
            page={PageType.createCategory}
            title="Create a new Category"
            fields={categoryFields}
            onSubmit={handleCreateCategory}
            submitButtonText={'Create'}
            backTo = {'/categories'}
        />
    );
};

export default CreateCategory;