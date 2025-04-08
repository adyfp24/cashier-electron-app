import React, { useContext, useEffect, useState } from 'react'
import { SettingContext } from '../../context/settingContext';

function Navbar() {
    const [darkMode, setDarkMode] = useState(() => {
        // Initialize from localStorage or system preference
        const saved = localStorage.getItem("theme");
        if (saved) return saved === "dark";
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    const { settings, loading: settingsLoading, error: settingsError } = useContext(SettingContext);

    useEffect(() => {
        const html = document.querySelector("html");
        if (darkMode) {
            html?.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            html?.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(prev => !prev);
    }

    return (
        <>
            <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div class="px-3 py-3 lg:px-5 lg:pl-3">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center justify-start rtl:justify-end">
                            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <span class="sr-only">Open sidebar</span>
                                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>

                            </button>
                            <a href="https://flowbite.com" class="flex ms-2 md:me-24">
                                <img src={settings.logo_aplikasi} class="h-8 me-3" alt="FlowBite Logo" />
                                <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">{settings.nama_aplikasi}</span>
                            </a>
                        </div>
                        <div class="flex items-center">
                            <div>
                                <button
                                    onClick={toggleDarkMode}
                                    className={`w-14 h-8 flex items-center rounded-full px-1 transition-colors duration-300 ${darkMode ? 'bg-gray-700' : 'bg-yellow-400'
                                        }`}
                                >
                                    <div
                                        className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 flex items-center justify-center ${darkMode ? 'translate-x-6' : 'translate-x-0'
                                            }`}
                                    >
                                        {darkMode ? (
                                            // Moon icon
                                            <svg className="w-4 h-4 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                            </svg>
                                        ) : (
                                            // Better sun icon
                                            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 4.75a.75.75 0 01.75.75v.5a.75.75 0 01-1.5 0v-.5a.75.75 0 01.75-.75zm5.657 2.343a.75.75 0 011.06 0l.353.354a.75.75 0 11-1.06 1.06l-.354-.353a.75.75 0 010-1.061zM19.25 12a.75.75 0 01.75.75v.5a.75.75 0 01-1.5 0v-.5a.75.75 0 01.75-.75zm-1.182 5.657a.75.75 0 011.06-1.06l.353.353a.75.75 0 01-1.06 1.061l-.353-.354zM12 19.25a.75.75 0 01.75.75v.5a.75.75 0 01-1.5 0v-.5a.75.75 0 01.75-.75zm-5.657-1.182a.75.75 0 011.06 1.06l-.353.354a.75.75 0 11-1.061-1.06l.354-.354zM4.75 12a.75.75 0 01.75.75v.5a.75.75 0 01-1.5 0v-.5A.75.75 0 014.75 12zm1.182-5.657a.75.75 0 00-1.06 1.06l.353.354a.75.75 0 101.061-1.06l-.354-.354zM12 7.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9z" />
                                            </svg>
                                        )}
                                    </div>
                                </button>

                            </div>

                            <div class="flex items-center ms-3">
                                <div className='flex items-center'>
                                    <div className="mr-3 text-center text-black dark:text-white">
                                        <div className="flex items-center justify-center">
                                            <p className='font-medium text-gray-700 dark:text-gray-200'>Version 1.0.0</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav >
        </>
    )
}

export default Navbar