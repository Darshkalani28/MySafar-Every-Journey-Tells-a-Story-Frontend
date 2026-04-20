import { useEffect, useState } from 'react'
import API from '../services/api';

export const useAuth = () => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const userId = localStorage.getItem("userId");
            
            if (accessToken && userId) {
                const res = await API.get(`/user/current-user/${userId}`);
                setUser(res.data.data);
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
             console.log("❌ Auth check FAILED!");
    console.log("Error message:", error.message);
    console.log("Error response:", error.response?.data);
    console.log("Error status:", error.response?.status);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("userId");
            setIsAuthenticated(false);
        } finally{
            setLoading(false);
        }
    };
    
    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("user");
        setUser(null);
        setIsAuthenticated(false);
    };

    const login = (accessToken, userData) => {
        localStorage.setItem("accessToken", accessToken);
        setUser(userData);
        setIsAuthenticated(true);
    };



    return {
        userId: user?._id,
        user,
        loading,
        isAuthenticated,
        logout,
        login,
    };
};