import React, { useState, useEffect } from 'react'

function LoginForm({ onLogin, error, settings }) {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const handleChange = (e) => {
        const { value, name } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(formData);
    }

    return (
        <>
            <div className="w-1/2 bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src={settings.logo_aplikasi}
                            alt="logo" />
                        {settings.nama_aplikasi}
                    </a>
                    <div
                        className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1
                                className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Login Administrator 🧑🏻‍💻
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label for="username"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        username</label>
                                    <input onChange={handleChange}
                                        value={formData.username}
                                        type="text"
                                        name="username"
                                        id="username"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="masukkan username"
                                        required />
                                    {error && error.toLowerCase().includes('username') && <p className="text-sm text-red-500">{error}</p>}
                                </div>
                                <div>
                                    <label for="password"
                                        className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input onChange={handleChange}
                                        value={formData.password}
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required />
                                    {error && error.toLowerCase().includes('password') && <p className="text-sm text-red-500">{error}</p>}
                                </div>
                                <div>
                                    <button type="submit"
                                        className="w-full mt-4 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign
                                        in</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginForm