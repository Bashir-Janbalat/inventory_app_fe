import {FormField} from "../../types/FormField.ts";
import CreateComponent from "../common/CreateComponent.tsx";
import {PageType} from "../../types/PageType.ts";
import React from "react";
import {useNavigate} from "react-router-dom";
import {CreateUpdateSupplierDTO} from "../../types/SupplierDTO.ts";
import {createSupplier} from "../../api/SupplierApi.ts";

const CreateSupplier: React.FC = () => {
    const navigate = useNavigate();

    const supplierFields: FormField[] = [
        {name: 'name', label: ' Name', required: true},
        {name: 'contactEmail', label: 'Contact Email', required: true}];

    const handleCreateSupplier = async (values: Record<string, string>) => {
        const supplier: CreateUpdateSupplierDTO = {
            name: values.name,
            contactEmail: values.contactEmail,
            phone: values.pohne,
            address: values.pohne
        };
        const status = await createSupplier(supplier);
        if (status === 201) {
            navigate("/suppliers");
        }
    };

    return (
        <CreateComponent
            page={PageType.createSupplier}
            title="Create a new Supplier"
            fields={supplierFields}
            onSubmit={handleCreateSupplier}
            submitButtonText={'Create'}
            backTo={'/suppliers'}
        />
    );
};

export default CreateSupplier;