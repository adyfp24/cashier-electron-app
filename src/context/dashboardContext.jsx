import React, {useState, useEffect, createContext} from 'react';
import dashboardService from '../services/dashboardService';
import { useLocation } from 'react-router-dom';

export const DashboardContext = createContext();

export const DashboardProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [allRecapData, setAllRecapData] = useState(null);
    const location = useLocation();
    const getAllRecapData = async () => {
        setLoading(true);
        try {
            const allData = await dashboardService.getAllRecapData();
            setAllRecapData(allData);
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        getAllRecapData();
    }, [location.pathname]);

    return (
        <DashboardContext.Provider value={{
            loading,
            error,
            allRecapData,
        }}>
            {children}
        </DashboardContext.Provider>
    )
}