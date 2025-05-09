import {useCallback, useState} from 'react';
import {getCategories, getCategorySize} from '../api/CategoryApi';
import {getBrands, getBrandSize} from '../api/BrandApi';
import {getWarehouses} from '../api/Warehous';
import {getSuppliers, getSupplierSize} from '../api/SupplierApi';
import {getProductById} from '../api/ProductApi';
import {CategoryDTO} from '../types/CategoryDTO';
import {BrandDTO} from '../types/BrandDTO';
import {SupplierDTO} from '../types/SupplierDTO';
import {ProductDTO, WarehouseDTO} from '../types/ProductDTO';
import {useFetcher} from './useFetcher';

type InitialDataOptions = {
    loadCategories?: boolean;
    loadBrands?: boolean;
    loadSuppliers?: boolean;
    loadWarehouses?: boolean;
    loadProduct?: boolean;
};

const useProductFormData = (id?: string, options?: InitialDataOptions) => {
    const [categories, setCategories] = useState<CategoryDTO[]>([]);
    const [brands, setBrands] = useState<BrandDTO[]>([]);
    const [suppliers, setSuppliers] = useState<SupplierDTO[]>([]);
    const [warehouses, setWarehouses] = useState<WarehouseDTO[]>([]);
    const [product, setProduct] = useState<ProductDTO>();

    const {
        loadCategories = false,
        loadBrands = false,
        loadSuppliers = false,
        loadWarehouses = false,
        loadProduct = false
    } = options || {};

    const fetcher = useCallback(async () => {
        const tasks: Promise<void>[] = [];

        if (loadCategories) {
            tasks.push(
                getCategorySize().then((size) =>
                    getCategories(0, size || 1).then((res) => setCategories(res.content))
                )
            );
        }

        if (loadBrands) {
            tasks.push(
                getBrandSize().then((size) =>
                    getBrands(0, size || 1).then((res) => setBrands(res.content))
                )
            );
        }

        if (loadSuppliers) {
            tasks.push(
                getSupplierSize().then((size) =>
                    getSuppliers(0, size || 1).then((res) => setSuppliers(res.content))
                )
            );
        }

        if (loadWarehouses) {
            tasks.push(getWarehouses().then((res) => setWarehouses(res)));
        }

        if (loadProduct && id) {
            tasks.push(
                getProductById(Number(id)).then((productResponse) => {
                    setProduct({
                        ...productResponse,
                        productAttributes: productResponse.productAttributes.map((attr) => ({
                            ...attr,
                            isInitial: true,
                        })),
                    });
                })
            );
        }

        await Promise.all(tasks);
    }, [id, loadCategories, loadBrands, loadSuppliers, loadWarehouses, loadProduct]);

    const {fetchData, loading, error} = useFetcher(fetcher);

    return {
        fetchData,
        loading,
        error,
        categories,
        brands,
        suppliers,
        warehouses,
        product,
    };
};

export default useProductFormData;
