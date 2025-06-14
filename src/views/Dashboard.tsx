import BannerDashboardComponent from '../components/web/BannerDashboardComponent';
import ProgressionGraphic from '../components/web/ProgressionGraphic';
import CarbonTest from '../components/web/CarbonTest';

export default function Dashboard() {
    return (
        <div>
            <BannerDashboardComponent />
            <ProgressionGraphic />
            <CarbonTest />
        </div>
    );
}