import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer} from 'recharts';
import {useCallback, useEffect, useState} from 'react';
import {useFetcher} from '../../hooks/useFetcher';
import Loading from '../base/Loading';
import {ErrorMessage} from '../common/ErrorMessage';
import {MonthlyProductCountStatsDTO} from '../../types/MonthlyProductCountStatsDTO';
import {getMonthlyProductStats} from '../../api/dashboardApi';
import {Box} from '@mui/material';

const MonthlyProductChart = () => {
    const [monthlyStats, setMonthlyStats] = useState<MonthlyProductCountStatsDTO[]>([]);

    const fetchStats = useCallback(async () => {
        const response = await getMonthlyProductStats();
        setMonthlyStats(response);
        return response;
    }, []);

    const {fetchData, loading, error} = useFetcher<MonthlyProductCountStatsDTO[]>(fetchStats);

    useEffect(() => {
        void fetchData();
    }, [fetchData]);

    if (loading) return <Loading fullScreen message="Loading monthly stats..."/>;
    if (error) return <ErrorMessage message={error} onRetry={() => void fetchData()}/>;

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <h3>Monthly Added Products</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyStats}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="month"/>
                    <YAxis allowDecimals={false}/>
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey="count" fill="#1976d2"/>
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default MonthlyProductChart;
