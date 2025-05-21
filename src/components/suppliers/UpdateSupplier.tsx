import {useParams} from "react-router-dom";
import {UpdateForm} from "../common/UpdateForm";
import {useCallback} from "react";
import {CreateUpdateSupplierDTO} from "../../types/SupplierDTO.ts";
import {getSupplierById, updateSupplier} from "../../api/SupplierApi.ts";

const UpdateSupplier = () => {
    const {id} = useParams<{ id: string }>();

    const parsedId = id ? parseInt(id, 10) : undefined;

    const fetcher = useCallback(async () => {
        if (parsedId === undefined) {
            throw new Error("No ID provided!");
        }
        return await getSupplierById(parsedId);
    }, [parsedId]);

    const updater = useCallback(async (updatedSupplier: CreateUpdateSupplierDTO) => {
        if (parsedId === undefined) {
            throw new Error("No ID provided!");
        }
        await updateSupplier(parsedId, updatedSupplier);
    }, [parsedId]);

    if (!parsedId) {
        return <div>No ID provided!</div>;
    }

    return (
        <UpdateForm
            fetcher={fetcher}
            updater={updater}
            redirectPath="/suppliers"
        />
    );
};

export default UpdateSupplier;
