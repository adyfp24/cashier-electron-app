import React, {createContext, useState, useEffect} from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const login = async (data) => {
        setLoading(true);
        try {
            const loggedInUser = await authService.login(data);
            setUser(loggedInUser);
        } catch (error) {
            setError(error);
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

    useEffect(() => {
        
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            error,
            login,
            register
        }}>
            {children}
        </AuthContext.Provider>
    )
}