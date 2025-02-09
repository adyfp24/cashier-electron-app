import React, {useContext, useEffect} from 'react'
import LoginForm from '../components/fragments/LoginForm'
import loginImg from '../../public/images/login.jpg'
import { AuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
import { SettingContext } from '../context/settingContext'

function AuthPage() {
    const {isAuthenticated, login, error: authError, loading: authLoading,user} = useContext(AuthContext);
    const {settings, loading: settingsLoading, error: settingsError} = useContext(SettingContext);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && isAuthenticated && user) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate, user]);

    if (authLoading || settingsLoading) {
        return (
            <div className="flex items-center justify-center w-full h-screen">
                <h1>Loading...</h1>
            </div>
        );
    }

    if (isAuthenticated && user) {
        return null;
    }
    console.log(settings)
    
    return (
        <>
            <section className="flex w-full h-screen main-container bg-slate-400">
                <div className="w-1/2">
                    <img className="h-full" src="/images/login.jpg" alt="" />
                </div>
                <LoginForm onLogin={login} error={authError} settings={settings}/>
            </section>
        </>
    )
}

export default AuthPage