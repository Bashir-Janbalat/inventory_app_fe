import React, {useCallback, useEffect, useState} from 'react';
import {SupplierDTO} from '../../types/SupplierDTO.ts';
import {deleteSupplier, getSuppliers} from '../../api/SupplierApi.ts';
import Loading from "../base/Loading.tsx";
import {useFetcher} from "../../hooks/useFetcher.ts";
import {ErrorMessage} from "../common/ErrorMessage.tsx";
import GenericTable from "../common/GenericTable.tsx";
import {renderCenteredCells} from "../../utils/StyleUtils.tsx";

const Suppliers: React.FC = () => {
    const [suppliers, setSuppliers] = useState<SupplierDTO[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const size = 6;

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
        <GenericTable<SupplierDTO>
            title="Suppliers"
            items={suppliers}
            totalPages={totalPages}
            page={page}
            setPage={setPage}
            showCreateButton={true}
            createPath="/createSupplier"
            updatePath={(id) => `/suppliers/update/${id}`}
            deleteItem={deleteSupplier}
            columnTitles={["id", "Name", "Contact email", "Phone", "Address"]}
            renderColumns={(supplier) => (renderCenteredCells([
                    supplier.id,
                    supplier.name,
                    supplier.contactEmail,
                    supplier.phone,
                    supplier.address
                ])
            )}
        />
    );
};

export default Suppliers;
