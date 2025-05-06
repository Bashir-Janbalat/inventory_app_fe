import {useParams} from "react-router-dom";
import {UpdateForm} from "../common/UpdateForm";
import {useCallback, useEffect, useState} from "react";
import {getProductById, updateProduct} from "../../api/ProductApi";
import {ProductDTO} from "../../types/ProductDTO.ts";
import {CategoryDTO} from "../../types/CategoryDTO.ts";
import {SupplierDTO} from "../../types/SupplierDTO.ts";
import {BrandDTO} from "../../types/BrandDTO.ts";
import {useFetcher} from "../../hooks/useFetcher.ts";
import {getCategories, getCategorySize} from "../../api/CategoryApi.ts";
import {getBrands, getBrandSize} from "../../api/BrandApi.ts";
import {getSuppliers, getSupplierSize} from "../../api/SupplierApi.ts";
import Loading from "../base/Loading.tsx";
import {ErrorMessage} from "../common/ErrorMessage.tsx";

const UpdateProduct = () => {
    const {id} = useParams<{ id: string }>();
    const [categories, setCategories] = useState<CategoryDTO[]>([]);
    const [suppliers, setSuppliers] = useState<SupplierDTO[]>([]);
    const [brands, setBrands] = useState<BrandDTO[]>([]);

    const {fetchData: fetchInitialData, loading: initialDataLoading, error: initialDataError} = useFetcher(
        async () => {
            const [categorySize, brandSize, supplierSize] = await Promise.all([
                getCategorySize(),
                getBrandSize(),
                getSupplierSize(),
            ]);
            const [categoriesResponse, brandsResponse, suppliersResponse] = await Promise.all([
                getCategories(0, categorySize === 0 ? 1 : categorySize),
                getBrands(0, brandSize === 0 ? 1 : brandSize),
                getSuppliers(0, supplierSize === 0 ? 1 : supplierSize)
            ]);
            setCategories(categoriesResponse.content);
            setBrands(brandsResponse.content);
            setSuppliers(suppliersResponse.content);
            return {
                categories: categoriesResponse.content,
                brands: brandsResponse.content,
                suppliers: suppliersResponse.content,
            };
        });
    useEffect(() => {
        fetchInitialData();
    }, []);

    const parsedId = id ? parseInt(id, 10) : undefined;

    const fetcher = useCallback(async () => {
        if (parsedId === undefined) {
            throw new Error("No ID provided!");
        }
        const product = await getProductById(parsedId);
        const fieldsToRemove = ['brandName', 'categoryName', 'supplierName','supplierContactEmail'];
        const cleanedProduct: Record<string, any> = {...product};
        fieldsToRemove.forEach((field) => delete cleanedProduct[field]);

        return cleanedProduct as ProductDTO;
    }, [parsedId]);

    const updater = useCallback(async (updatedProduct: ProductDTO) => {
        if (parsedId === undefined) {
            throw new Error("No ID provided!");
        }
        await updateProduct(parsedId, updatedProduct);
    }, [parsedId]);

    if (!parsedId) {
        return <div>No ID provided!</div>;
    }
    if (initialDataLoading) {
        return <Loading fullScreen message="Loading product..."/>;
    }
    if (initialDataError) {
        return <ErrorMessage message={initialDataError} onRetry={() => {
            fetchInitialData()
        }}/>;
    }

    return (
        <UpdateForm
            id={parsedId}
            fetcher={fetcher}
            updater={updater}
            redirectPath="/products"
            selectOptions={{
                supplierID: suppliers.map((s) => ({value: s.id, label: s.name})),
                brandID: brands.map((b) => ({value: b.id, label: b.name})),
                categoryID: categories.map((c) => ({value: c.id, label: c.name})),
            }}
        />
    );
};

export default UpdateProduct;
