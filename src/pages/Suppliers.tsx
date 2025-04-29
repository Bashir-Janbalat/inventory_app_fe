import React, {useEffect, useState} from 'react';
import {SupplierDTO} from '../types/SupplierDTO';
import {getSuppliers} from '../api/SupplierApi.ts';
import Loading from "../components/base/LoadingProps.tsx";
import SupplierList from "../components/suppliers/SupplierList.tsx";

const Suppliers: React.FC = () => {
    const [suppliers, setSuppliers] = useState<SupplierDTO[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const data = await getSuppliers();
                setSuppliers(data.content);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) {
        return <Loading fullScreen message="Suppliers Brands..."/>;
    }

    return (
        <SupplierList suppliers={suppliers} />
    );
};

export default Suppliers;
