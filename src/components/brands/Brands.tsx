import React, {useCallback, useEffect, useState} from 'react';
import {BrandStatsDTO} from '../../types/BrandDTO.ts';
import Loading from "../base/Loading.tsx";
import {deleteBrand, getBrandsWithStats} from "../../api/BrandApi.ts";
import {useFetcher} from "../../hooks/useFetcher.ts";
import {ErrorMessage} from "../common/ErrorMessage.tsx";
import GenericTable from "../common/GenericTable.tsx";
import TableCell from '@mui/material/TableCell';

const Brands: React.FC = () => {
    const [brands, setBrands] = useState<BrandStatsDTO[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const size = 9;

    const fetchBrands = useCallback(async () => {
        const pagedResponse = await getBrandsWithStats(page - 1, size);
        setBrands(pagedResponse.content);
        setTotalPages(pagedResponse.totalPages);
        return pagedResponse.content;
    }, [page]);

    const {fetchData, loading, error} = useFetcher<BrandStatsDTO[]>(fetchBrands);


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
        <GenericTable<BrandStatsDTO>
            title="Brands"
            items={brands}
            totalPages={totalPages}
            page={page}
            setPage={setPage}
            createPath="/createBrand"
            updatePath={(id) => `/brands/update/${id}`}
            deleteItem={deleteBrand}
            columnTitles={["id", "Name", "Product Count", "Total Stock"]}
            renderColumns={(brand) => (
                <>
                    <TableCell sx={{textAlign: 'center'}}>{brand.id}</TableCell>
                    <TableCell sx={{textAlign: 'center'}}>{brand.name}</TableCell>
                    <TableCell sx={{textAlign: 'center'}}>{brand.productCount}</TableCell>
                    <TableCell sx={{textAlign: 'center'}}>{brand.totalStock}</TableCell>
                </>
            )}
        />

    );
};

export default Brands;
