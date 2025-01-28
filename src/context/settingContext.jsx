import React, { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { get } from "superagent";
const settingService = require('../services/settingService');

export const SettingContext = createContext();

export const SettingProvider = ({ children }) => {
    const [settings, setSettings] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    const getAllSetting = async () => {
        setLoading(true);
        try {
            const allSettings = await settingService.getAllSetting();
            setSettings(allSettings[0]);
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };

    const updateSettingName = async (newData) => {
        setLoading(true);
        try {
            const updatedSetting = await settingService.updateSettingName(newData);
            getAllSetting();
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };

    const updateSettingLogo = async (newData) => {
        setLoading(true);
        try {
            const updatedSetting = await settingService.updateSettingLogo(newData);
            getAllSetting();
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        getAllSetting();
    }, [location.pathname]);

    return (
        <SettingContext.Provider
            value={{
                settings,
                error,
                loading,
                getAllSetting,
                updateSettingName,
                updateSettingLogo
            }}>
            {children}
        </SettingContext.Provider>
    );
}