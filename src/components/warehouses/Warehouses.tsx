import React, {useCallback, useEffect, useState} from 'react';
import Loading from "../base/Loading.tsx";
import {useFetcher} from "../../hooks/useFetcher.ts";
import {ErrorMessage} from "../common/ErrorMessage.tsx";
import {deleteWarehous, getWarehousesWithStats} from "../../api/WarehousApi.ts";
import {WarehouseStatsDTO} from "../../types/WarehouseDTO.ts";
import GenericTable from "../common/GenericTable.tsx";
import TableCell from '@mui/material/TableCell';

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
        <GenericTable<WarehouseStatsDTO>
            title="Warehouses"
            items={warehouses}
            totalPages={totalPages}
            page={page}
            setPage={setPage}
            createPath="/createWarehouse"
            updatePath={(id) => `/warehouses/update/${id}`}
            deleteItem={deleteWarehous}
            columnTitles={["id", "Name", "address", "product Count", "Total Stock"]}
            renderColumns={(category) => (
                <>
                    <TableCell sx={{textAlign: 'center'}}>{category.id}</TableCell>
                    <TableCell sx={{textAlign: 'center'}}>{category.name}</TableCell>
                    <TableCell sx={{textAlign: 'center'}}>{category.address}</TableCell>
                    <TableCell sx={{textAlign: 'center'}}>{category.productCount}</TableCell>
                    <TableCell sx={{textAlign: 'center'}}>{category.totalStockQuantity}</TableCell>
                </>
            )}
        />
    );
};

export default Warehouses;
