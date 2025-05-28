import {useCallback, useEffect, useState} from 'react';

import {Box, Grid, Paper, Typography} from '@mui/material';
import {getDashboardSummary} from "../../api/DashboardApi.ts";
import {DashboardSummaryStatsDTO} from "../../types/DashboardSummaryStatsDTO.ts";
import Loading from "../base/Loading.tsx";
import {ErrorMessage} from "../common/ErrorMessage.tsx";
import {useFetcher} from "../../hooks/useFetcher.ts";

const DashboardSummary = () => {
    const defaultSummary: DashboardSummaryStatsDTO = {
        totalProducts: 0,
        totalCategories: 0,
        totalBrands: 0,
        totalSuppliers: 0,
        totalWarehouses: 0,
        totalStockQuantity: 0
    };
    const [summary, setSummary] = useState<DashboardSummaryStatsDTO>(defaultSummary);


    const fetchSummary = useCallback(async () => {
        const response = await getDashboardSummary();
        setSummary(response);
        return response;
    }, []);

    const {fetchData, loading, error} = useFetcher<DashboardSummaryStatsDTO>(fetchSummary);


    useEffect(() => {
        void fetchData();
    }, [fetchData]);

    if (loading) {
        return <Loading fullScreen message="Loading Summary..."/>;
    }
    if (error) {
        return <ErrorMessage message={error} onRetry={() => {
            void fetchData();
        }}/>;
    }

    return (
        <Box sx={{p: 2}}>
            <Typography variant="h5" gutterBottom>Dashboard Summary</Typography>
            <Grid container spacing={2}>
                <Grid size={{xs: 6, sm: 4, md: 3}}>
                    <Paper sx={{p: 2}}>
                        <Typography variant="body1" fontWeight="bold" >Total Products</Typography>
                        <Typography variant="h6">{summary.totalProducts}</Typography>
                    </Paper>
                </Grid>
                <Grid size={{xs: 6, sm: 4, md: 3}}>
                    <Paper sx={{p: 2}}>
                        <Typography variant="body1" fontWeight="bold" >Total Categories</Typography>
                        <Typography variant="h6">{summary.totalCategories}</Typography>
                    </Paper>
                </Grid>
                <Grid size={{xs: 6, sm: 4, md: 3}}>
                    <Paper sx={{p: 2}}>
                        <Typography variant="body1" fontWeight="bold" >Total Brands</Typography>
                        <Typography variant="h6">{summary.totalBrands}</Typography>
                    </Paper>
                </Grid>
                <Grid size={{xs: 6, sm: 4, md: 3}}>
                    <Paper sx={{p: 2}}>
                        <Typography variant="body1" fontWeight="bold" >Total Suppliers</Typography>
                        <Typography variant="h6">{summary.totalSuppliers}</Typography>
                    </Paper>
                </Grid>
                <Grid size={{xs: 6, sm: 4, md: 3}}>
                    <Paper sx={{p: 2}}>
                        <Typography variant="body1" fontWeight="bold" >Total Warehouses</Typography>
                        <Typography variant="h6">{summary.totalWarehouses}</Typography>
                    </Paper>
                </Grid>
                <Grid size={{xs: 6, sm: 4, md: 3}}>
                    <Paper sx={{p: 2}}>
                        <Typography variant="body1" fontWeight="bold" >Total Stock Quantity</Typography>
                        <Typography variant="h6">{summary.totalStockQuantity}</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default DashboardSummary;
