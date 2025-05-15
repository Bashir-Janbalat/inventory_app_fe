import React, {useCallback, useEffect, useState} from 'react';
import {BrandDTO} from '../types/BrandDTO';
import Loading from "../components/base/Loading.tsx";
import BrandList from "../components/brands/BrandList.tsx";
import {getBrandsWithStats} from "../api/BrandApi.ts";
import {useFetcher} from "../hooks/useFetcher.ts";
import {ErrorMessage} from "../components/common/ErrorMessage.tsx";

const Brands: React.FC = () => {
    const [brands, setBrands] = useState<BrandDTO[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const size = 9;

    const fetchBrands = useCallback(async () => {
        const pagedResponse = await getBrandsWithStats(page - 1, size);
        setBrands(pagedResponse.content);
        setTotalPages(pagedResponse.totalPages);
        return pagedResponse.content;
    }, [page]);

    const {fetchData, loading, error} = useFetcher<BrandDTO[]>(fetchBrands);


    useEffect(() => {
        void fetchData();
    }, [fetchData]);

    if (loading) {
        return <Loading fullScreen message="Loading Brands..."/>;
    }
    if (error) {
        return <ErrorMessage message={error} onRetry={() => {
            void fetchData();
        }}/>;
    }

    return (
        <BrandList items={brands}
                   totalPages={totalPages}
                   page={page}
                   setPage={setPage}
        />

    );
};

export default Brands;
