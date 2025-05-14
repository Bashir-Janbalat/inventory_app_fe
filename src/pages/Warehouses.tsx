import React, {useCallback, useEffect, useState} from 'react';
import Loading from "../components/base/Loading";
import {useFetcher} from "../hooks/useFetcher";
import {ErrorMessage} from "../components/common/ErrorMessage";
import {WarehouseDTO} from "../types/ProductDTO";
import WarehousList from "../components/warehouses/WarehousList";
import {getPagedWarehouses} from "../api/WarehousApi.ts";

const Warehouses: React.FC = () => {
    const [warehouses, setWarehouses] = useState<WarehouseDTO[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const size = 9;

    const fetchBrands = useCallback(async () => {
        const pagedResponse = await getPagedWarehouses(page - 1, size);
        setWarehouses(pagedResponse.content);
        setTotalPages(pagedResponse.totalPages);
        return pagedResponse.content;
    }, [page]);

    const {fetchData, loading, error} = useFetcher<WarehouseDTO[]>(fetchBrands);


    useEffect(() => {
        void fetchData();
    }, [fetchData]);

    if (loading) {
        return <Loading fullScreen message="Loading Warehouses..."/>;
    }
    if (error) {
        return <ErrorMessage message={error} onRetry={() => {
            void fetchData();
        }}/>;
    }

    return (
        <WarehousList items={warehouses}
                   totalPages={totalPages}
                   page={page}
                   setPage={setPage}
        />

    );
};

export default Warehouses;
