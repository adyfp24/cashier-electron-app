import React, {useContext, useEffect} from 'react'
import LoginForm from '../components/fragments/LoginForm'
import loginImg from '../../public/images/login.jpg'
import { AuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
import { SettingContext } from '../context/settingContext'

function AuthPage() {
    const { isAuthenticated, login, error: authError, loading: authLoading } = useContext(AuthContext);
    const { settings, loading: settingsLoading, error: settingsError } = useContext(SettingContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    if (authLoading || settingsLoading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    if(isAuthenticated){
        navigate('/dashboard')
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