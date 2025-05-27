import {Cell, Legend, Pie, PieChart, Tooltip} from 'recharts';
import {useCallback, useEffect, useState} from 'react';
import {ProductStatusCountStatsDTO} from "../../types/ProductStatusCountStatsDTO.ts";
import {getProductStatusSummary} from "../../api/dashboardApi.ts";
import {useFetcher} from "../../hooks/useFetcher.ts";
import Loading from "../base/Loading.tsx";
import {ErrorMessage} from "../common/ErrorMessage.tsx";
import { Box } from '@mui/material';

type productStatusType = "ACTIVE" | "INACTIVE" | "DELETED" | "DISCONNECTED";

const STATUS_COLORS = {
    ACTIVE: '#4caf50',
    INACTIVE: '#ff9800',
    DELETED: '#f44336',
    DISCONNECTED: '#9e9e9e'
};

const ProductStatusChart = () => {
    const [productStatusSummary, setProductStatusSummary] = useState<ProductStatusCountStatsDTO[]>([]);


    const fetchSummary = useCallback(async () => {
        const response = await getProductStatusSummary();
        setProductStatusSummary(response);
        return response;
    }, []);

    const {fetchData, loading, error} = useFetcher<ProductStatusCountStatsDTO[]>(fetchSummary);


    useEffect(() => {
        void fetchData();
    }, [fetchData]);

    if (loading) {
        return <Loading fullScreen message="Loading Product Status..."/>;
    }
    if (error) {
        return <ErrorMessage message={error} onRetry={() => {
            void fetchData();
        }}/>;
    }


    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <h3>Product Status Distribution</h3>
            <PieChart width={400} height={300}>
                <Pie
                    data={productStatusSummary}
                    dataKey="count"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                >
                    {productStatusSummary.map((entry, index) => (
                        <Cell key={`cell-${index}`}
                              fill={STATUS_COLORS[entry.status as productStatusType] || '#000000'}/>
                    ))}
                </Pie>
                <Tooltip/>
                <Legend/>
            </PieChart>
        </Box>
    );
};

export default ProductStatusChart;
