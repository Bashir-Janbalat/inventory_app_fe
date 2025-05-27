import {Grid} from "@mui/material";
import DashboardSummary from "./DashboardSummary.tsx";
import ProductStatusChart from "./ProductStatusChart.tsx";
import StockStatusChart from "./StockStatusChart.tsx";

const Dashboard: React.FC = () => {
    return (
        <>
            <Grid container spacing={2}>
                <Grid size={{xs: 12, sm: 12, md: 12}} sx={{borderBottom: 1, borderColor: 'divider', p: 2, mb: 2}}>
                    <DashboardSummary/>
                </Grid>
                <Grid container size={{xs: 12, sm: 12, md: 12}} sx={{borderBottom: 1, borderColor: 'divider', pl: 8, pr: 8}} >
                    <Grid size={{xs: 12, sm: 6, md: 6}} display="flex" justifyContent="center" alignItems="center">
                        <ProductStatusChart/>
                    </Grid>
                    <Grid size={{xs: 12, sm: 6, md: 6}} display="flex" justifyContent="center" alignItems="center">
                        <StockStatusChart/>
                    </Grid>
                </Grid>
            </Grid>
        </>

    );
}
export default Dashboard;
