import React, {useCallback, useEffect, useState} from 'react';
import {SupplierDTO} from '../../types/SupplierDTO.ts';
import {getSuppliers} from '../../api/SupplierApi.ts';
import Loading from "../base/Loading.tsx";
import SupplierList from "./SupplierList.tsx";
import {useFetcher} from "../../hooks/useFetcher.ts";
import {ErrorMessage} from "../common/ErrorMessage.tsx";

const Suppliers: React.FC = () => {
    const [suppliers, setSuppliers] = useState<SupplierDTO[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const size = 9;

    const fetchCategories = useCallback(async () => {
        const pagedResponse = await getSuppliers(page - 1, size);
        setSuppliers(pagedResponse.content);
        setTotalPages(pagedResponse.totalPages);
        return pagedResponse.content;
    }, [page]);

    const {fetchData, loading, error} = useFetcher<SupplierDTO[]>(fetchCategories);


    useEffect(() => {
        void fetchData();
    }, [fetchData]);

    if (loading) {
        return <Loading fullScreen message="Loading Suppliers..."/>;
    }
    if (error) {
        return <ErrorMessage message={error} onRetry={() => {
            void fetchData();
        }}/>;
    }

    return (
        <SupplierList items={suppliers}
                      totalPages={totalPages}
                      page={page}
                      setPage={setPage}/>
    );
};

export default Suppliers;
