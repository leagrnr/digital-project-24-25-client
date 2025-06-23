import { useEffect } from 'react';
import BannerDashboardComponent from '../components/web/BannerDashboardComponent';
import ProgressionGraphic from '../components/web/ProgressionGraphic';
import CarbonTest from '../components/web/CarbonTest';

export default function Dashboard() {
    useEffect(() => {
        if (window.location.hash === '#carbon-test') {
            const el = document.getElementById('carbon-test');
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, []);

    return (
        <div>
            <BannerDashboardComponent />
            <ProgressionGraphic />
            <div id="carbon-test">
                <CarbonTest />
            </div>
        </div>
    );
}