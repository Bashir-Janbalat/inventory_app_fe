import React, {useCallback, useEffect, useState} from 'react';
import Loading from "../base/Loading.tsx";
import {useFetcher} from "../../hooks/useFetcher.ts";
import {ErrorMessage} from "../common/ErrorMessage.tsx";
import WarehousList from "./WarehousList.tsx";
import {getWarehousesWithStats} from "../../api/WarehousApi.ts";
import {WarehouseStatsDTO} from "../../types/WarehouseDTO.ts";

const Warehouses: React.FC = () => {
    const [warehouses, setWarehouses] = useState<WarehouseStatsDTO[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const size = 9;

    const fetchWarehouses = useCallback(async () => {
        const pagedResponse = await getWarehousesWithStats(page - 1, size);
        setWarehouses(pagedResponse.content);
        setTotalPages(pagedResponse.totalPages);
        return pagedResponse.content;
    }, [page]);

    const {fetchData, loading, error} = useFetcher<WarehouseStatsDTO[]>(fetchWarehouses);


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
