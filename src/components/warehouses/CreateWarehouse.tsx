import {FormField} from "../../types/FormField.ts";
import CreateComponent from "../common/CreateComponent.tsx";
import {PageType} from "../../types/PageType.ts";
import React from "react";
import {useNavigate} from "react-router-dom";
import {createWarehouse} from "../../api/WarehousApi.ts";
import {WarehouseDTO} from "../../types/WarehouseDTO.ts";

const CreateWarehouse: React.FC = () => {
    const navigate = useNavigate();

    const warehousFields: FormField[] = [
        {name: 'name', label: 'Warehouse Name', required: true},{name: 'address', label: 'Warehouse address', required: true}];

    const handleCreateWarehous = async (values: Record<string, string>) => {
        const warehouseDTO: WarehouseDTO = {name: values.name, address: values.address};
        const status = await createWarehouse(warehouseDTO);
        if (status === 201) {
            navigate("/warehouses");
        }
    };

    return (
        <CreateComponent
            page={PageType.createWarehous}
            title="Create a new warehouse"
            fields={warehousFields}
            onSubmit={handleCreateWarehous}
            submitButtonText={'Create'}
            backTo={'/warehouses'}
        />
    );
};

export default CreateWarehouse;