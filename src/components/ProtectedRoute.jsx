import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom';
// import Loader from './Loader';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <p>Loading....</p>;

    // If authenticated, show the children; otherwise redirect to login
    return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute
