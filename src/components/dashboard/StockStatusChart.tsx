import {Cell, Legend, Pie, PieChart, Tooltip} from 'recharts';
import {useCallback, useEffect, useState} from 'react';
import {useFetcher} from '../../hooks/useFetcher.ts';
import Loading from '../base/Loading.tsx';
import {ErrorMessage} from '../common/ErrorMessage.tsx';
import {StockStatusCountStatsDTO} from '../../types/StockStatusCountStatsDTO.ts';
import {getStockStatusSummary} from "../../api/DashboardApi.ts";
import { Box } from '@mui/material';

type stockStatusType = 'IN_STOCK' | 'OUT_OF_STOCK' | 'LOW_STOCK';

const STOCK_STATUS_COLORS = {
    IN_STOCK: '#4caf50',
    OUT_OF_STOCK: '#f44336',
    LOW_STOCK: '#ff9800',
};

const StockStatusChart = () => {
    const [stockStatusSummary, setStockStatusSummary] = useState<StockStatusCountStatsDTO[]>([]);

    const fetchSummary = useCallback(async () => {
        const response = await getStockStatusSummary();
        setStockStatusSummary(response);
        return response;
    }, []);

    const {fetchData, loading, error} = useFetcher<StockStatusCountStatsDTO[]>(fetchSummary);

    useEffect(() => {
        void fetchData();
    }, [fetchData]);

    if (loading) return <Loading fullScreen message="Loading stock status..."/>;
    if (error)
        return (
            <ErrorMessage
                message={error}
                onRetry={() => {
                    void fetchData();
                }}
            />
        );

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <h3>Stock Status Distribution</h3>
            <PieChart width={400} height={300}>
                <Pie
                    data={stockStatusSummary}
                    dataKey="count"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                >
                    {stockStatusSummary.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={STOCK_STATUS_COLORS[entry.status as stockStatusType] || '#000000'}
                        />
                    ))}
                </Pie>
                <Tooltip/>
                <Legend/>
            </PieChart>
        </Box>
    );
};

export default StockStatusChart;