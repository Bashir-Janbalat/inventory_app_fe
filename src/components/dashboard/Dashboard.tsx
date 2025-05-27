import DashboardSummary from "./DashboardSummary.tsx";
import ProductStatusChart from "./ProductStatusChart.tsx";

const Dashboard: React.FC = () => {
    return (
        <>
            <DashboardSummary/>
            <ProductStatusChart/>
        </>

    );
}
export default Dashboard;
