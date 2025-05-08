import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import MobileNavigation from './components/mobile/NavbarComponent';
import Navbar from './components/web/NavbarComponent';

export default function App() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            <Navbar />
            {isMobile && <MobileNavigation />}
        </>
    );
}