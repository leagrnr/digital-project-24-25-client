import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.tsx';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { user, loading } = useAuth();

    if (loading) return <div>Chargement...</div>;

    return user ? children : <Navigate to="/login" replace />;
}
