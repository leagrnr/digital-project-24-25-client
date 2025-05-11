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




export default function App() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            <Router>
                <Navbar />
                {isMobile && <MobileNavigation />}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/lesson/:category" element={<LessonList />} />
                    <Route path="/lesson/:category/:id" element={<LessonDetail />} />
                    <Route path="/quiz/:category" element={<QuizList />} />
                    <Route path="/quiz/:category/:id" element={<QuizDetail />} />
                    <Route path="/quiz/:category/:id" element={<QuizDetail />} />
                    <Route path="/setting" element={<Setting />} />
                </Routes>
            </Router>

        </>
    );
}