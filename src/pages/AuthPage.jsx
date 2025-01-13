import React from 'react'
import LoginForm from '../components/fragments/LoginForm'
import loginImg from '../../public/images/login.jpg'

function AuthPage() {
    return (
        <>
            <section className="flex w-full h-screen main-container bg-slate-400">
                <div className="w-1/2">
                    <img className="h-full" src="/images/login.jpg" alt="" />
                </div>
                <LoginForm />
            </section>
        </>
    )
}

export default AuthPage