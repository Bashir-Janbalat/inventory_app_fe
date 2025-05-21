import React, {useCallback, useEffect, useState} from 'react';
import {CategoryStatsDTO} from '../../types/CategoryDTO.ts';
import {deleteCategory, getCategoriesWithStats} from '../../api/CategoryApi.ts';
import Loading from "../base/Loading.tsx";
import {useFetcher} from "../../hooks/useFetcher.ts";
import {ErrorMessage} from "../common/ErrorMessage.tsx";
import GenericTable from "../common/GenericTable.tsx";
import {renderCenteredCells} from "../../utils/StyleUtils.tsx";

const Categories: React.FC = () => {
    const [categories, setCategories] = useState<CategoryStatsDTO[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const size = 6;

    const fetchCategories = useCallback(async () => {
        const pagedResponse = await getCategoriesWithStats(page - 1, size);
        setCategories(pagedResponse.content);
        setTotalPages(pagedResponse.totalPages);
        return pagedResponse.content;
    }, [page]);

    const {fetchData, loading, error} = useFetcher<CategoryStatsDTO[]>(fetchCategories);


    useEffect(() => {
        void fetchData();
    }, [fetchData]);

    if (loading) {
        return <Loading fullScreen message="Loading Categories..."/>;
    }
    if (error) {
        return <ErrorMessage message={error} onRetry={() => {
            void fetchData();
        }}/>;
    }

    return (
        <GenericTable<CategoryStatsDTO>
            title="Categories"
            items={categories}
            totalPages={totalPages}
            page={page}
            setPage={setPage}
            createPath="/createCategory"
            updatePath={(id) => `/categories/update/${id}`}
            deleteItem={deleteCategory}
            columnTitles={["id", "Name", "Product Count", "Brands count", "Total Stock"]}
            renderColumns={(category) =>
                renderCenteredCells([
                    category.id,
                    category.name,
                    category.totalProducts,
                    category.totalBrands,
                    category.totalStockQuantity
                ])
            }
        />
    );
};

export default Categories;
