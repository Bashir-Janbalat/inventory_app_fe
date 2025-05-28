import {useParams} from "react-router-dom";
import {UpdateForm} from "../common/UpdateForm";
import {getBrandById, updateBrand} from "../../api/BrandApi";
import {BrandDTO} from "../../types/BrandDTO";
import {useCallback} from "react";

const UpdateBrand = () => {
    const {id} = useParams<{ id: string }>();

    const parsedId = id ? parseInt(id, 10) : undefined;

    const fetcher = useCallback(async () => {
        if (parsedId === undefined) {
            throw new Error("No ID provided!");
        }
        return await getBrandById(parsedId);
    }, [parsedId]);

    const updater = useCallback(async (updatedBrand: BrandDTO) => {
        if (parsedId === undefined) {
            throw new Error("No ID provided!");
        }
        await updateBrand(parsedId, updatedBrand);
    }, [parsedId]);

    if (!parsedId) {
        return <div>No ID provided!</div>;
    }

    return (
        <UpdateForm
            fetcher={fetcher}
            updater={updater}
            redirectPath="/brands"
        />
    );
};

export default UpdateBrand;
