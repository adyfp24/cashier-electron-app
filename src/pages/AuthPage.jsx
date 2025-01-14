import React, {useContext, useEffect} from 'react'
import LoginForm from '../components/fragments/LoginForm'
import loginImg from '../../public/images/login.jpg'
import { AuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'

function AuthPage() {
    const { isAuthenticated, login, error, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    if(loading){
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    if(isAuthenticated){
        navigate('/dashboard')
    }
    
    return (
        <>
            <section className="flex w-full h-screen main-container bg-slate-400">
                <div className="w-1/2">
                    <img className="h-full" src="/images/login.jpg" alt="" />
                </div>
                <LoginForm onLogin={login} error={error}/>
            </section>
        </>
    )
}

export default AuthPage