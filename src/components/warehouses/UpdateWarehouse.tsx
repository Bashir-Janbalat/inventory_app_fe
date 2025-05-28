import {useParams} from "react-router-dom";
import {UpdateForm} from "../common/UpdateForm";
import {useCallback} from "react";
import {getWarehouseById, updateWarehouse} from "../../api/WarehouseApi.ts";
import {WarehouseDTO} from "../../types/WarehouseDTO.ts";

const UpdateWarehouse = () => {
    const {id} = useParams<{ id: string }>();

    const parsedId = id ? parseInt(id, 10) : undefined;

    const fetcher = useCallback(async () => {
        if (parsedId === undefined) {
            throw new Error("No ID provided!");
        }
        return await getWarehouseById(parsedId);
    }, [parsedId]);

    const updater = useCallback(async (updatedWarehous: WarehouseDTO) => {
        if (parsedId === undefined) {
            throw new Error("No ID provided!");
        }
        await updateWarehouse(parsedId, updatedWarehous);
    }, [parsedId]);

    if (!parsedId) {
        return <div>No ID provided!</div>;
    }

    return (
        <UpdateForm
            fetcher={fetcher}
            updater={updater}
            redirectPath="/warehouses"
        />
    );
};

export default UpdateWarehouse;
