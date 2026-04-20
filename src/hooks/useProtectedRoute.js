import { useNavigate } from "react-router-dom"
import { useAuth } from "./useAuth";
import { useEffect } from "react";

export const useProtectedRoute = () => {
    const navigate = useNavigate();
    const {isAuthenticated, loading} = useAuth();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, loading, navigate]);

    return { loading, isAuthenticated };
};