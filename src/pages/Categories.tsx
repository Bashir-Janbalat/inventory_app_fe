import React, {useCallback, useEffect, useState} from 'react';
import {CategoryDTO} from '../types/CategoryDTO';
import {getCategories} from '../api/CategoryApi.ts';
import Loading from "../components/base/Loading.tsx";
import CategoryList from '../components/categories/CategoryList.tsx';
import {useFetcher} from "../hooks/useFetcher.ts";
import {ErrorMessage} from "../components/common/ErrorMessage.tsx";

const Categories: React.FC = () => {
    const [categories, setCategories] = useState<CategoryDTO[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const size = 9;

    const fetchCategories = useCallback(async () => {
        const pagedResponse = await getCategories(page - 1, size);
        setCategories(pagedResponse.content);
        setTotalPages(pagedResponse.totalPages);
        return pagedResponse.content;
    }, [page]);

    const {fetchData, loading, error} = useFetcher<CategoryDTO[]>(fetchCategories);


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

    return (<CategoryList items={categories}
                          totalPages={totalPages}
                          page={page}
                          setPage={setPage}/>
    );
};

export default Categories;
