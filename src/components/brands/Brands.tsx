import React, {useCallback, useEffect, useState} from 'react';
import {BrandStatsDTO} from '../../types/BrandDTO.ts';
import Loading from "../base/Loading.tsx";
import {deleteBrand, getBrandsWithStats} from "../../api/BrandApi.ts";
import {useFetcher} from "../../hooks/useFetcher.ts";
import {ErrorMessage} from "../common/ErrorMessage.tsx";
import GenericTable from "../common/GenericTable.tsx";
import {renderCenteredCells} from "../../utils/StyleUtils.tsx";

const Brands: React.FC = () => {
    const [brands, setBrands] = useState<BrandStatsDTO[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const size = 6;

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
            showCreateButton={true}
            createPath="/createBrand"
            updatePath={(id) => `/brands/update/${id}`}
            deleteItem={deleteBrand}
            columnTitles={["id", "Name", "Number of Products", "Total Stock"]}
            renderColumns={(brand) => (renderCenteredCells([
                    brand.id,
                    brand.name,
                    brand.productCount,
                    brand.totalStock
                ])
            )}
        />

    );
};

export default Brands;
