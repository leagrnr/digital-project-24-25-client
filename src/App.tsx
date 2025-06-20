import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import MobileNavigation from './components/mobile/NavbarComponent';
import Navbar from './components/web/NavbarComponent';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/views/Home';
import Dashboard from '../src/views/Dashboard';
import LessonList from '../src/views/LessonList';
import LessonDetail from '../src/views/LessonDetail';
import QuizDetail from "./views/QuizDetail.tsx";
import QuizList from "./views/QuizList.tsx";
import Setting from "./views/Setting.tsx";
import FooterComponent from "./components/web/FooterComponent.tsx";
import { useLocation } from 'react-router-dom';




export default function App() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const location = useLocation();
    const isLessonListPage = location.pathname.startsWith('/lesson') && location.pathname.split('/').length === 3;

    return (
        <div className="flex flex-col min-h-screen">
                <Navbar />
                {isMobile && <MobileNavigation />}
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/lesson/:category" element={<LessonList />} />
                        <Route path="/lesson/:category/:id" element={<LessonDetail />} />
                        <Route path="/quiz/:category" element={<QuizList />} />
                        <Route path="/quiz/:category/:id" element={<QuizDetail />} />
                        <Route path="/setting" element={<Setting />} />
                    </Routes>
                </main>
                <FooterComponent noMarginTop={isLessonListPage} />
        </div>
    );
}
