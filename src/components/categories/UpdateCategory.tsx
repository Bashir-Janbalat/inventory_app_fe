import {useParams} from "react-router-dom";
import {UpdateForm} from "../common/UpdateForm";
import {useCallback} from "react";
import {CategoryDTO} from "../../types/CategoryDTO.ts";
import {getCategoryById, updateCategory} from "../../api/CategoryApi.ts";

const UpdateCategory = () => {
    const {id} = useParams<{ id: string }>();

    const parsedId = id ? parseInt(id, 10) : undefined;

    const fetcher = useCallback(async () => {
        if (parsedId === undefined) {
            throw new Error("No ID provided!");
        }
        return await getCategoryById(parsedId);
    }, [parsedId]);

    const updater = useCallback(async (updatedCategory: CategoryDTO) => {
        if (parsedId === undefined) {
            throw new Error("No ID provided!");
        }
        await updateCategory(parsedId, updatedCategory);
    }, [parsedId]);

    if (!parsedId) {
        return <div>No ID provided!</div>;
    }

    return (
        <UpdateForm
            id={parsedId}
            fetcher={fetcher}
            updater={updater}
            redirectPath="/categories"
        />
    );
};

export default UpdateCategory;
