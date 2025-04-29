import React, {useEffect, useState} from 'react';
import {BrandDTO} from '../types/BrandDTO';
import Loading from "../components/base/LoadingProps.tsx";
import BrandList from "../components/brands/BrandList.tsx";
import {getBrands} from "../api/BrandApi.ts";

const Brands: React.FC = () => {
    const [brands, setBrands] = useState<BrandDTO[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const data = await getBrands();
                setBrands(data.content);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) {
        return <Loading fullScreen message="Loading Brands..."/>;
    }

    return (
        <BrandList brands={brands} />
    );
};

export default Brands;
