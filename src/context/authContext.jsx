import React, {createContext, useState, useEffect} from 'react';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const userData = await authService.verifyToken(token);
                    setUser(userData);
                    setIsAuthenticated(true);
                } catch (error) {
                    localStorage.removeItem('token');
                    setUser(null);
                    setIsAuthenticated(false);
                    setError('Session expired. Please login again.');
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const loggedInUser = await authService.login(data);
            localStorage.setItem('token', loggedInUser.token)
            setUser(loggedInUser);
            navigate('/dashboard');
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    }


    const register = async (data) => {
        setLoading(true);
        try {
            const newUser = await authService.register(data);
            return newUser;
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    }

    const logout = () => {
        try{
            setUser(null);
            localStorage.removeItem('token');
            navigate('/');
        }catch(error){
            setError(error)
        }
    }

    useEffect(() => {
        setIsAuthenticated(localStorage.getItem('token') ? true : false)
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            error,
            isAuthenticated,
            login,
            register,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}