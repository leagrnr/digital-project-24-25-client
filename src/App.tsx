import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import MobileNavigation from './components/mobile/NavbarComponent';
import Navbar from './components/web/NavbarComponent';

import { AuthProvider } from './contexts/AuthContext';
import { Routes, Route } from 'react-router-dom';
import Home from '../src/views/Home';
import Dashboard from '../src/views/Dashboard';
import LessonList from '../src/views/LessonList';
import LessonDetail from '../src/views/LessonDetail';
import QuizDetail from "./views/QuizDetail.tsx";
import QuizList from "./views/QuizList.tsx";
import Setting from "./views/Setting.tsx";
import FooterComponent from "./components/web/FooterComponent.tsx";
import Login from './views/Login';
import ProtectedRoute from "./components/web/ProtectedRoute.tsx";
import Landing from './views/Landing';
import { useLocation } from 'react-router-dom';


export default function App() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const location = useLocation();

    const isLoginPage = location.pathname === '/login';
    const isLessonListPage = location.pathname.startsWith('/lesson') && location.pathname.split('/').length === 3;
    const isLandingPage = location.pathname === '/landing';
    const isQuizDetailPage = location.pathname.startsWith('/quiz') && location.pathname.split('/').length === 3;

    return (
        <AuthProvider>
            <div className="min-h-screen flex flex-col">
                {!isLoginPage && <Navbar />}
                {isMobile && !isLoginPage && <MobileNavigation />}
                <main className="flex-1">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/landing" element={<Landing />} />
                      
                        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                        <Route path="/lesson/:id" element={<ProtectedRoute><LessonDetail /></ProtectedRoute>} />
                        <Route path="/lesson" element={<ProtectedRoute><LessonList /></ProtectedRoute>} />
                        <Route path="/quiz/:id" element={<ProtectedRoute><QuizDetail /></ProtectedRoute>} />
                        <Route path="/quiz" element={<ProtectedRoute><QuizList /></ProtectedRoute>} />
                        <Route path="/setting" element={<ProtectedRoute><Setting /></ProtectedRoute>} />
                    </Routes>
                </main>
                {!isLoginPage && <FooterComponent noMarginTop={isLessonListPage || isLandingPage || isQuizDetailPage} />}
            </div>
        </AuthProvider>
    );
}
