import React, { useState, useEffect, createContext } from 'react';
import dashboardService from '../services/dashboardService';
import { useLocation } from 'react-router-dom';

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [allRecapData, setAllRecapData] = useState(null);
    const [availableYears, setAvailableYears] = useState([]);

    const location = useLocation();
    const getAllRecapData = async (params = {}) => {
        setLoading(true);
        try {
            let { month = null, year = null } = params;
            if (!year) year = new Date().getFullYear();

            const allData = await dashboardService.getAllRecapData({ month, year });
            setAllRecapData(allData);
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    };

    const getAvailableYears = async () => {
        setLoading(true);
        try {
            const years = await dashboardService.getAvailableYears();
            setAvailableYears(years);
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        getAllRecapData();
    }, [location.pathname]);

    return (
        <DashboardContext.Provider value={{
            loading,
            error,
            allRecapData,
            availableYears,
            getAvailableYears,
            getAllRecapData
        }}>
            {children}
        </DashboardContext.Provider>
    )
}