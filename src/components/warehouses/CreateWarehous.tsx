import {FormField} from "../../types/FormField.ts";
import CreateComponent from "../common/CreateComponent.tsx";
import {PageType} from "../../types/PageType.ts";
import React from "react";
import {useNavigate} from "react-router-dom";
import {WarehouseDTO} from "../../types/ProductDTO.ts";
import {createWarehous} from "../../api/WarehousApi.ts";

const CreateWarehous: React.FC = () => {
    const navigate = useNavigate();

    const warehousFields: FormField[] = [
        {name: 'name', label: 'Warehous Name', required: true},{name: 'address', label: 'Warehous address', required: true}];

    const handleCreateWarehous = async (values: Record<string, string>) => {
        const warehouseDTO: WarehouseDTO = {name: values.name, address: values.address};
        const status = await createWarehous(warehouseDTO);
        if (status === 201) {
            navigate("/warehouses");
        }
    };

    return (
        <CreateComponent
            page={PageType.createWarehous}
            title="Create a new warehous"
            fields={warehousFields}
            onSubmit={handleCreateWarehous}
            submitButtonText={'Create'}
            backTo={'/warehouses'}
        />
    );
};

export default CreateWarehous;